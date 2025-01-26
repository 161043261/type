package gnet

import (
	"bronya.com/go-socket/ignet"
)

// BaseRoute 基础路由
type BaseRoute struct {
}

// PreHandler MsgHandler 前的 hook 方法
func (route *BaseRoute) PreHandler(ignet.IReq) {
}

// MsgHandler 处理拆包得到的消息
func (route *BaseRoute) MsgHandler(ignet.IReq) {
}

// PostHandler MsgHandler 后的 hook 方法
func (route *BaseRoute) PostHandler(ignet.IReq) {
}
