package interfaces

// ITcpServer tcp 服务器
type ITcpServer interface {
	// Start 启动 tcp 服务器
	Start()

	// Serve 运行 tcp 服务
	Serve()

	// Stop 停止 tcp 服务器
	Stop()

	// BindMidWare tcp 消息绑定中间件
	BindMidWare(msgId uint32, midWare ITcpMidWare)
}
