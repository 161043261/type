package main

import (
	"bronya.com/srv/implements"
	"bronya.com/srv/interfaces"
	"log"
)

type PingMidWare struct {
	implements.TcpBaseMidWare
}

type EchoMidWare struct {
	implements.TcpBaseMidWare
}

func (midWare *PingMidWare) MsgHandler(req interfaces.ITcpReq) {
	log.Printf("Msg: len=%v, id=%v, data=%v\n", req.GetMsgLen(), req.GetMsgId(), string(req.GetMsgData()))
	err := req.GetConn().SendPac(1, []byte("ping"))
	if err != nil {
		log.Println("Send pac err", err)
	}
}

func (midWare *EchoMidWare) MsgHandler(req interfaces.ITcpReq) {
	log.Printf("Msg: len=%v, id=%v, data=%v\n", req.GetMsgLen(), req.GetMsgId(), string(req.GetMsgData()))
	err := req.GetConn().SendPac(1, []byte("echo"))
	if err != nil {
		log.Println("Send pac err", err)
	}
}

func main() {
	// 创建 tcp 服务器
	server := implements.NewTcpServer()
	// 使用中间件
	server.BindMidWare(0 /* msgId */, &PingMidWare{} /* midWare */)
	server.BindMidWare(1 /* msgId */, &EchoMidWare{} /* midWare */)
	// 启动 tcp 服务器，运行 tcp 服务
	server.Serve()
}
