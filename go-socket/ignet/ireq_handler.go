package ignet

// IReqHandle 处理请求, 请求封装连接和消息
// 处理请求的协程池 WorkerPool 中的协程 c 负责处理 ReqChanArr[c] 中的请求
type IReqHandle interface {
	// BindRoute消息绑定路由
	BindRoute(msgId uint32, route IRoute)

	// UseRoute消息使用路由
	UseRoute(req IReq)

	// StartWorkerPool 启动处理请求的协程池 WorkerPool
	StartWorkerPool()

	// StartWorker 启动处理请求的协程 Worker, 协程 c 负责处理 ReqChanArr[c] 中的请求
	StartWorker(reqChan chan IReq)

	// PushToReqChan请求队列 reqChan <-请求
	PushToReqChan(req IReq)
}
