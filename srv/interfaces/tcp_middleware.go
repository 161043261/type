package interfaces

// ITcpMidWare tcp 中间件
type ITcpMidWare interface {
	// PreHandler MsgHandler 前的 hook 方法，预处理
	PreHandler(req ITcpReq)

	// MsgHandler 处理拆包得到的 tcp 消息
	MsgHandler(req ITcpReq)

	// PostHandler MsgHandler 后的 hook 方法，后处理
	PostHandler(req ITcpReq)
}
