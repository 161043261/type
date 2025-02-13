package main

import (
	"bronya.com/go-socket/global"
	"bronya.com/go-socket/gnet"
	"bronya.com/go-socket/ignet"
	"fmt"
	"log"
	"os"
)

type PingRoute struct {
	gnet.BaseRoute
}

type EchoRoute struct {
	gnet.BaseRoute
}

func (route *PingRoute) MsgHandler(req ignet.IReq) {
	log.Printf("Receive message: {Length=%v, Id=%v, Data='%v'}\n", req.GetMsgLen(), req.GetMsgId(), string(req.GetMsgData()))
	err := req.GetConn().SendPacket(200, []byte("ping"))
	if err != nil {
		log.Println("Send packet error", err)
	}
}

func (route *EchoRoute) MsgHandler(req ignet.IReq) {
	log.Printf("Receive message: {Length=%v, Id=%v, Data='%v'}\n", req.GetMsgLen(), req.GetMsgId(), string(req.GetMsgData()))
	err := req.GetConn().SendPacket(201, []byte("echo"))
	if err != nil {
		log.Println("Send packet error", err)
	}
}

// afterConnStart 启动连接后执行的钩子函数
func afterConnStart(conn ignet.IConn) {
	err := conn.SendPacket(200, []byte(fmt.Sprintf("Starting connection ID = %d", conn.GetId())))
	if err != nil {
		log.Println("Send packet error", err)
	}
	log.Println("Set property {Name, Homepage}")
	// 设置连接属性
	conn.SetProp("Username", "Tiancheng")
	conn.SetProp("Homepage", "https://161043261.github.io/")
}

// beforeConnStop 停止连接前执行的钩子函数
func beforeConnStop(conn ignet.IConn) {
	log.Printf("Stopping connection ID = %d\n", conn.GetId())
	// 获取连接属性
	if username, ok := conn.GetProp("Username"); ok {
		log.Printf("Username: %s\n", username)
	}
	if homepage, ok := conn.GetProp("Homepage"); ok {
		log.Printf("Homepage: %s\n", homepage)
	}
}

func main() {
	if len(os.Args) != 2 {
		log.Println("Configure error, use default")
	} else {
		global.ReadConf(os.Args[1])
	}
	// 创建服务器
	server := gnet.NewServer()
	// 注册 AfterConnStart 启动连接后执行的钩子函数
	server.UseAfterConnStart(afterConnStart)
	// 注册 BeforeConnStop 停止连接前执行的钩子函数
	server.UseBeforeConnStop(beforeConnStop)
	// 消息绑定路由
	server.BindRoute(0 /* msgId */, &PingRoute{} /* route */)
	server.BindRoute(1 /* msgId */, &EchoRoute{} /* route */)
	// 启动服务器
	server.Start()
}
