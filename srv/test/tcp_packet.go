package test

import (
	"bronya.com/srv/implements"
	"io"
	"log"
	"net"
	"sync"
	"testing"
)

// go test -run TestTcpPacMan
func TestTcpPacMan(t *testing.T) {
	waitGroup := sync.WaitGroup{}
	defer waitGroup.Wait()

	listener, err := net.Listen("tcp4", "127.0.0.1:8080")
	if err != nil {
		log.Println("Listen err", err.Error())
		return
	}

	// 服务器 goroutine
	go func() {
		waitGroup.Add(1)
		defer waitGroup.Done()
		conn, err := listener.Accept()
		if err != nil {
			log.Println("Accept err", err.Error())
			return
		}
		pacMan := implements.NewTcpPacMan()
		go func(conn net.Conn) {
			waitGroup.Add(1)
			defer waitGroup.Done()

			for {
				// 第 1 次从 conn 中读出 8 字节的 pacHead (msgLen + msgId)
				pacHead := make([]byte, pacMan.GetHeadLen())
				if _ /* readBytes == 8 */, err := io.ReadFull(conn, pacHead); err != nil {
					log.Println("Read full err", err.Error())
					return
				}
				// 拆包，将 packet 字节数组反序列化为 msg 结构体变量（tcp 数据包 -> tcp 消息）
				msg, err := pacMan.Unpack(pacHead)
				if err != nil {
					log.Println("Unpack err", err.Error())
					return
				}
				var data []byte
				if msg.GetLen() > 0 { //  msgLen > 0
					// 第 2 次从 conn 中读出 pacBody (msgData)
					data = make([]byte, msg.GetLen())
					if _ /* readBytes */, err = io.ReadFull(conn, data); err != nil {
						log.Println("Read full err", err.Error())
						return
					}
				}
				msg.SetData(data)
				log.Printf("Msg: len=%v, id=%v, data=%v\n", msg.GetLen(), msg.GetId(), string(msg.GetData()))
			}
		}(conn)
	}()

	// 客户端 goroutine
	conn, err := net.Dial("tcp4", "127.0.0.1:8080")
	if err != nil {
		log.Println("Dial err", err.Error())
		return
	}

	//! 使用闭包处理错误
	defer func(conn net.Conn) {
		err := conn.Close()
		if err != nil {
			log.Println("Close err", err.Error())
		}
	}(conn)

	pacMan := implements.NewTcpPacMan()
	//! 封装第 1 个 tcp 数据包 pac1
	msg1 := &implements.TcpMsg{
		Len:  3,
		Id:   0,
		Data: []byte{'W', 'a', 'n'},
	}
	pac1, err := pacMan.Pack(msg1)
	if err != nil {
		log.Println("Pack err", err.Error())
		return
	}

	//! 封装第 2 个 tcp 数据包 pac2
	msg2 := &implements.TcpMsg{
		Len:  5,
		Id:   1,
		Data: []byte{'P', 'r', 'o', 'x', 'y'},
	}
	pac2, err := pacMan.Pack(msg2)
	if err != nil {
		log.Println("Pack err", err.Error())
		return
	}

	//! tcp 粘包
	pac1 = append(pac1, pac2...)
	_ /* writeBytes */, err = conn.Write(pac1)
	if err != nil {
		log.Println("Write err", err.Error())
		return
	}
}
