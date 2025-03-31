package implements

import (
	"bronya.com/srv/interfaces"
	"log"
)

// TcpMidWareMan 负责 tcp 消息绑定中间件、tcp 请求中的 tcp 消息使用中间件
type TcpMidWareMan struct {
	BindDict map[uint32]interfaces.ITcpMidWare
}

// NewTcpMidWareMan 创建 TcpMidWareMan 结构体变量，多例
func NewTcpMidWareMan() *TcpMidWareMan {
	return &TcpMidWareMan{
		BindDict: make(map[uint32]interfaces.ITcpMidWare),
	}
}

// BindMidWare tcp 消息绑定中间件
func (man *TcpMidWareMan) BindMidWare(msgId uint32, midWare interfaces.ITcpMidWare) {
	if _, ok := man.BindDict[msgId]; ok {
		log.Println("Use midWare err")
		return
	}
	man.BindDict[msgId] = midWare
	log.Println("Use midWare ok")
}

// UseMidWare tcp 请求中的 tcp 消息使用中间件
func (man *TcpMidWareMan) UseMidWare(req interfaces.ITcpReq) {
	midWare, ok := man.BindDict[req.GetMsgId()]
	if !ok {
		log.Println("MidWare not found")
	}
	midWare.PreHandler(req)
	midWare.MsgHandler(req)
	midWare.PostHandler(req)
}
