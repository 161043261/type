package ignet

// IServer 服务器
type IServer interface {
	// Start 启动服务器
	Start()

	// GetConnMan 获取 connMan 管理连接
	GetConnMan() IConnMan

	// BindRoute 消息绑定路由
	BindRoute(msgId uint32, route IRoute)

	// Stop 停止服务器
	Stop()

	// UseAfterConnStart 注册 AfterConnStart 方法启动连接后执行的钩子函数
	UseAfterConnStart(func(conn IConn))

	// DoAfterConnStart 调用 AfterConnStart 方法启动连接后执行的钩子函数
	DoAfterConnStart(conn IConn)

	// UseBeforeConnStop 注册 BeforeConnStop 方法停止连接前执行的钩子函数
	UseBeforeConnStop(func(conn IConn))

	// DoBeforeConnStop 调用 BeforeConnStop 方法停止连接前执行的钩子函数
	DoBeforeConnStop(conn IConn)
}
