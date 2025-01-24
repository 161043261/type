package ignet

// IRoute 路由
type IRoute interface {
	// PreHandler MsgHandler 前的 hook 方法, 预处理
	PreHandler(req IReq)

	// MsgHandler 处理拆包得到的消息
	MsgHandler(req IReq)

	// PostHandler MsgHandler 后的 hook 方法, 后处理
	PostHandler(req IReq)
}
