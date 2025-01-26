package gtest

import (
	"io"
	"log"
	"net"
	"testing"
	"time"

	"bronya.com/go-socket/gnet"
)

// go test -run TestClient
func TestClient(t *testing.T) {
	log.Println("Start client0")
	time.Sleep(1 * time.Second)
	// ! 连接到指定的 IP 地址
	conn, err := net.Dial("tcp4", "127.0.0.1:3302")
	if err != nil {
		log.Println("Start client0 error", err.Error())
		return
	}
	defer conn.Close()
	msgSerialize := gnet.NewMsgSerializer()
	for {
		sendMsg := gnet.NewMsg(0, []byte("Message from client0"))
		sendPacket, err := msgSerialize.Pack(sendMsg)
		if err != nil {
			log.Println("Pack error", err.Error())
			return
		}
		// TODO sendPacket = []byte("Hello WanProxy")
		if _ /* writeBytes */, err := conn.Write(sendPacket); err != nil {
			log.Println("Write error", err.Error())
			return
		}
		// 第 1 次从 conn 中读出 8 字节的 recvPacketHead (msgLen + msgId)
		recvPacketHead := make([]byte, msgSerialize.GetHeadLen())
		if _ /* readBytes */, err := io.ReadFull(conn, recvPacketHead); err != nil {
			log.Println("Read full error", err.Error())
			return
		}
		// Unpack 拆包, 数据包反序列化为消息 (将 packet 字节数组反序列化为 Msg 结构体变量)
		recvMsg, err := msgSerialize.Unpack(recvPacketHead)
		if err != nil {
			log.Println("Unpack error", err.Error())
			return
		}
		var data []byte
		if recvMsg.GetLen() > 0 { //  msgLen > 0
			// 第 2 次从 conn 中读出 packetBody (msgData)
			data = make([]byte, recvMsg.GetLen())
			if _ /* readBytes */, err = io.ReadFull(conn, data); err != nil {
				log.Println("Read full error", err.Error())
				return
			}
		}
		recvMsg.SetData(data)
		log.Printf("Receive message: {Length=%v, Id=%v, Data='%v'}\n", recvMsg.GetLen(), recvMsg.GetId(), string(recvMsg.GetData()))
		time.Sleep(1 * time.Second)
	}
}
