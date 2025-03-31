package interfaces

// ITcpMidWareMan 负责 tcp 消息绑定中间件、tcp 请求中的 tcp 消息使用中间件
type ITcpMidWareMan interface {
	// BindMidWare tcp 消息绑定中间件
	BindMidWare(msgId uint32, midWare ITcpMidWare)

	// UseMidWare tcp 请求中的 tcp 消息使用中间件
	UseMidWare(req ITcpReq)
}
