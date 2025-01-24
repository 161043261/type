package gnet

import (
	"errors"
	"fmt"
	"io"
	"log"
	"net"
	"sync"

	"bronya.com/go-socket/global"
	"bronya.com/go-socket/ignet"
)

// Conn 连接
type Conn struct {
	ClosedChan chan struct{}    // 读 goroutine 通过 ClosedChan 通知写 goroutine 连接已关闭
	Id         uint32           // 连接 id
	ReqHandler ignet.IReqHandle // 消息绑定路由；消息使用路由
	PacketChan chan []byte      // SendMsg 方法通过 PacketChan 将数据包发送给写 goroutine
	Socket     *net.TCPConn     // 套接字
	isClosed   bool
	propDict   map[string]any // 键: 属性名
	rwLock     sync.RWMutex   // 读写 propDict 时使用的 rwLock 读写锁
}

// NewConn 创建 Conn 结构体变量, 多例
func NewConn(socket *net.TCPConn, id uint32, reqHandler ignet.IReqHandle) *Conn {
	conn := &Conn{
		ClosedChan: make(chan struct{}, 1), // 读 goroutine 通过 ClosedChan 通知写 goroutine 连接已关闭
		Id:         id,                     // 连接 id
		ReqHandler: reqHandler,             // 消息绑定路由；消息使用路由
		PacketChan: make(chan []byte),      // SendPacket 方法通过 PacketChan 将数据包发送给写 goroutine
		Socket:     socket,                 // 套接字
		isClosed:   false,
		propDict:   make(map[string]any),
	}
	// ! 向 connMan.connDict 中添加连接 conn
	global.Server.GetConnMan().AddConn(conn)
	return conn
}

// Start 启动连接
func (conn *Conn) Start() {
	log.Printf("Connection ID = %v, start connection\n", conn.Id)
	// 读 goroutine, 从 conn.Socket 中读出数据包
	go conn.StartReader()
	// 写 goroutine, 向 conn.Socket 中写入数据包
	go conn.StartWriter()
	global.Server.DoAfterConnStart(conn)
}

// StartReader 读 goroutine, 从 conn.Socket 中读出数据包
func (conn *Conn) StartReader() {
	log.Printf("Connection ID = %v, start reader, remote address %v\n", conn.Id, conn.GetRemoteAddr())
	defer log.Printf("Connection ID = %v, stop reader, remote address %v\n", conn.Id, conn.GetRemoteAddr())
	defer conn.Stop()
	// ! global.Conf.UseMsgSerializer == true (default)
	if global.Conf.UseMsgSerializer {
		for {
			msgSerialize := NewMsgSerializer()
			// 第 1 次从 conn 中读出 8 字节的 packetHead (msgLen + msgId)
			packetHead := make([]byte, msgSerialize.GetHeadLen())
			_ /* readBytes */, err := io.ReadFull(conn.GetSocket(), packetHead)
			if err != nil {
				log.Println("Read full error", err.Error())
				break // ! 调用 conn.Stop 方法关闭 socket 连接
			}
			// Unpack 拆包, 数据包反序列化为消息 (将 packet 字节数组反序列化为 Msg 结构体变量)
			msg, err := msgSerialize.Unpack(packetHead)
			if err != nil {
				log.Println("Unpack error", err.Error())
				break // ! 调用 conn.Stop 方法关闭 socket 连接
			}
			var data []byte
			if msg.GetLen() > 0 {
				// 第 2 次从 conn 中读出 packetBody (msgData)
				data = make([]byte, msg.GetLen())
				_ /* readBytes */, err = io.ReadFull(conn.Socket, data)
				if err != nil {
					log.Println("Read full error", err.Error())
					break // ! 调用 conn.Stop 关闭 socket 连接
				}
			}
			msg.SetData(data)
			req := Req{
				Conn: conn,
				Msg:  msg,
			}
			if global.Conf.WorkerPoolSize > 0 { // 已开启处理请求的协程池 WorkerPool
				conn.ReqHandler.PushToReqChan(&req) // 请求队列 reqChan <- 请求
			} else { // 未开启处理请求的协程池 WorkerPool
				// ! 消息使用路由
				go conn.ReqHandler.UseRoute(&req)
			}
		}
		return
	}
	// ! global.Conf.UseMsgSerializer == false
	for {
		data := make([]byte, global.Conf.MaxPacketSize)
		readBytes, err := conn.Socket.Read(data)
		if err != nil {
			log.Println("Read error", err.Error())
			break // ! 调用 conn.Stop 方法关闭 socket 连接
		}
		msg := &Msg{}
		msg.SetLen(uint32(readBytes))
		msg.SetId(0) // TODO 自增 msgId
		msg.SetData(data[:readBytes])
		req := Req{
			Conn: conn,
			Msg:  msg,
		}
		if global.Conf.WorkerPoolSize > 0 { // 已开启处理请求的协程池 WorkerPool
			conn.ReqHandler.PushToReqChan(&req) // 请求队列 reqChan <- 请求
		} else { // 未开启处理请求的协程池 WorkerPool
			// ! 消息使用路由
			go conn.ReqHandler.UseRoute(&req)
		}
	}
}

// StartWriter 写 goroutine, 向 conn.Socket 写入数据包
func (conn *Conn) StartWriter() {
	log.Printf("Connection ID = %v, start writer, remote address %v\n", conn.Id, conn.GetRemoteAddr())
	defer log.Printf("Connection ID = %v, stop writer, remote address %v\n", conn.Id, conn.GetRemoteAddr())
	// 写 goroutine 阻塞, 直到 PacketChan 中有数据包
	for {
		select {
		case packet := <-conn.PacketChan:
			{ // SendPacket 方法通过 PacketChan 将数据包发送给写 goroutine
				if _, err := conn.Socket.Write(packet); err != nil {
					log.Println("Write error", err.Error())
					return
				}
			}
		case <-conn.ClosedChan:
			{ // 读 goroutine 通过 ClosedChan 通知写 goroutine 连接已关闭
				return
			}
		}
	}
}

// GetId 获取连接 id
func (conn *Conn) GetId() uint32 {
	return conn.Id
}

// GetRemoteAddr 获取客户端的 ip 地址和端口
func (conn *Conn) GetRemoteAddr() net.Addr {
	return conn.Socket.RemoteAddr()
}

// GetSocket 获取套接字
func (conn *Conn) GetSocket() *net.TCPConn {
	return conn.Socket
}

// SendPacket 通过 PacketChan 将数据包发送给写 goroutine
func (conn *Conn) SendPacket(msgId uint32, msgData []byte) error {
	if conn.isClosed {
		return errors.New(fmt.Sprintf("connection Id=%d closed", msgId))
	}
	// Pack 封包, 消息序列化为数据包 (将 Msg 结构体变量序列化为 packet 字节数组)
	msg := NewMsg(msgId, msgData)
	packet, err := NewMsgSerializer().Pack(msg)
	if err != nil {
		log.Println("Pack error", err.Error())
		return err
	}
	// ! SendPacket 方法通过 PacketChan 将数据包发送给写 goroutine
	conn.PacketChan <- packet
	return err
}

// Stop 停止连接
func (conn *Conn) Stop() {
	log.Printf("Connection ID = %v, stop connection\n", conn.Id)
	if conn.isClosed {
		return
	}
	conn.isClosed = true
	global.Server.DoBeforeConnStop(conn)
	err := conn.Socket.Close() // 关闭 socket 连接
	if err != nil {
		log.Printf("Connection ID = %v, stop connection error %v\n", conn.Id, err.Error())
	}
	// 读 goroutine 通过 ClosedChan 通知写 goroutine 连接已关闭
	conn.ClosedChan <- struct{}{}
	// ! 从 connMan.connDict 中删除连接 conn
	global.Server.GetConnMan().DelConn(conn)
	// 回收资源
	close(conn.ClosedChan)
	close(conn.PacketChan)
}

// SetProp 设置连接属性
func (conn *Conn) SetProp(key string, value any) {
	conn.rwLock.Lock() // Lock 加写锁
	defer conn.rwLock.Unlock()
	conn.propDict[key] = value
}

// GetProp 获取连接属性
func (conn *Conn) GetProp(key string) (any, bool) {
	conn.rwLock.RLock() // RLock 加读锁
	defer conn.rwLock.RUnlock()
	prop, ok := conn.propDict[key]
	return prop, ok
}

// DelProp 删除连接属性
func (conn *Conn) DelProp(key string) {
	conn.rwLock.Lock() // Lock 加写锁
	defer conn.rwLock.Unlock()
	delete(conn.propDict, key)
}
