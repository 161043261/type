package implements

import (
	/* interfaces */ "bronya.com/srv/interfaces"
	"errors"
	"io"
	"log"
	"net"
)

// TcpConn tcp 连接
type TcpConn struct {
	Closed     chan struct{}             // 通知 tcp 连接已关闭的 chan
	Id         uint32                    // tcp 连接 id
	MidWareMan interfaces.ITcpMidWareMan // 负责 tcp 消息绑定中间件、tcp 请求中的 tcp 消息使用中间件
	Socket     *net.TCPConn              // tcp 套接字
	isClosed   bool                      // tcp 连接是否已关闭
}

// NewTcpConn 创建 tcp 连接变量
func NewTcpConn(socket *net.TCPConn, id uint32, midWareMan interfaces.ITcpMidWareMan) *TcpConn {
	conn := &TcpConn{
		Closed:     make(chan struct{}, 1), // 通知 tcp 连接已关闭的 chan
		Id:         id,                     // tcp 连接 id
		MidWareMan: midWareMan,             // 负责 tcp 消息绑定中间件、tcp 请求中的 tcp 消息使用中间件
		Socket:     socket,                 // tcp 套接字
		isClosed:   false,                  // tcp 连接是否已关闭
	}
	return conn
}

// Start 启动 tcp 连接
func (conn *TcpConn) Start() {
	log.Printf("conn.Id = %v. Start tcp conn\n", conn.Id)
	//! 从 conn.Socket 中读的 goroutine
	go conn.StartReader()
	//! 向 conn.Socket 中写的 goroutine
	// go conn.StartWriter()
}

// StartReader 从 conn.Socket 中读出 tcp 数据包 的 goroutine
func (conn *TcpConn) StartReader() {
	log.Printf("conn.Id = %v. Start reader goroutine, remoteAddr = %v\n", conn.Id, conn.GetRemoteAddr())
	defer log.Printf("conn.Id = %v. Stop reader goroutine, remoteAddr = %v\n", conn.Id, conn.GetRemoteAddr())
	defer conn.Stop()

	pacMan := NewTcpPacMan()
	for {
		// 第 1 次从 conn 中读出 8 字节的 pacHead (msgLen + msgId)
		pacHead := make([]byte, pacMan.GetHeadLen())
		_ /* readBytes */, err := io.ReadFull(conn.GetSocket(), pacHead)
		if err != nil {
			log.Println("Read full err", err.Error())
			break
		}
		// 拆包，将 packet 字节数组反序列化为 msg 结构体变量（tcp 数据包 -> tcp 消息）
		msg, err := pacMan.Unpack(pacHead)
		if err != nil {
			log.Println("Unpack err", err.Error())
			return
		}
		var data []byte
		if msg.GetLen() > 0 {
			// 第 2 次从 conn 中读出 pacBody (msgData)
			data = make([]byte, msg.GetLen())
			_ /* readBytes */, err = io.ReadFull(conn.Socket, data)
			if err != nil {
				log.Println("Read full err", err.Error())
				break
			}
		}
		msg.SetData(data)

		req := TcpReq{
			Conn: conn,
			Msg:  msg,
		}
		//! 使用 tcp 消息中间件的 goroutine，处理拆包得到的 tcp 消息
		go conn.MidWareMan.UseMidWare(&req)
	}
}

// Stop 停止 tcp 连接
func (conn *TcpConn) Stop() {
	log.Printf("conn.Id = %v. Stop tcp conn\n", conn.Id)
	if conn.isClosed {
		return
	}
	conn.isClosed = true
	err := conn.Socket.Close()
	if err != nil {
		log.Printf("conn.Id = %v. Stop tcp conn err %v\n", conn.Id, err.Error())
	}
	close(conn.Closed)
}

// GetId 获取 tcp 连接 id
func (conn *TcpConn) GetId() uint32 {
	return conn.Id
}

// GetRemoteAddr 获取客户端的 ip 地址和端口
func (conn *TcpConn) GetRemoteAddr() net.Addr {
	return conn.Socket.RemoteAddr()
}

// GetSocket 获取 tcp 套接字
func (conn *TcpConn) GetSocket() *net.TCPConn {
	return conn.Socket
}

// SendPac 发送 tcp 数据包
func (conn *TcpConn) SendPac(msgId uint32, msgData []byte) error {
	if conn.isClosed {
		return errors.New("conn is closed")
	}
	// 封包，将 msg 结构体变量序列化为 packet 字节数组（tcp 消息 -> tcp 数据包）
	pac, err := NewTcpPacMan().Pack(NewTcpMsg(msgId, msgData))
	if err != nil {
		log.Println("Pack err", err.Error())
		return err
	}
	_ /* writeBytes */, err = conn.Socket.Write(pac)
	if err != nil {
		log.Println("Write err", err.Error())
	}
	return err
}
