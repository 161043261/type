package test

import (
	"bronya.com/srv/implements"
	"io"
	"log"
	"net"
	"testing"
	"time"
)

// go test -run TestCli
func TestCli(t *testing.T) {
	log.Println("Start client")
	time.Sleep(1 * time.Second)

	//! 连接到指定的 IP 地址
	conn, err := net.Dial("tcp4", "127.0.0.1:3300")
	if err != nil {
		log.Println("Start client err", err.Error())
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
	for {
		pac, err := pacMan.Pack(implements.NewTcpMsg(0, []byte("Hello WanProxy")))
		if err != nil {
			log.Println("Pack err", err.Error())
			return
		}
		if _ /* writeBytes */, err := conn.Write(pac); err != nil {
			log.Println("Write err", err.Error())
			return
		}
		//! 客户端接收服务器响应的数据
		// 第 1 次从 conn 中读出 8 字节的 pacHead (msgLen + msgId)
		pacHead := make([]byte, pacMan.GetHeadLen())
		if _ /* readBytes */, err := io.ReadFull(conn, pacHead); err != nil {
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
		time.Sleep(1 * time.Second)
	}
}
