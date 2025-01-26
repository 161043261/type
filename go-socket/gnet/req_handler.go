package gnet

import (
	"bronya.com/go-socket/global"
	"bronya.com/go-socket/ignet"
	"log"
)

// ReqHandler 处理请求, 请求封装连接和消息
// 处理请求的协程池 WorkerPool 中的协程 c 负责处理 ReqChanArr[c] 中的请求
// @Func     NewReqHandler   创建 ReqHandler 结构体变量
// @Field    BindMap           消息绑定路由的 map
// @Field    ReqChanArr        请求队列 reqChan 的数组
// @Field    WorkerPoolSize     WorkerPool 中的 Worker 协程数
// @Method   BindRoute       消息绑定路由
// @Method   UseRoute        消息使用路由
// @Method   StartWorkerPool    启动处理请求的协程池 WorkerPool
// @Method   StartWorker        启动处理请求的协程 Worker
type ReqHandler struct {
	BindMap        map[uint32]ignet.IRoute // 消息绑定路由的 map
	ReqChanArr     []chan ignet.IReq       // 请求队列 reqChan 的数组
	WorkerPoolSize uint32                  // 处理请求的协程池 WorkerPool 中的 Worker 协程数
}

var reqHandler *ReqHandler

// NewReqHandler 创建 ReqHandler 结构体变量, 单例
func NewReqHandler() *ReqHandler {
	if reqHandler == nil {
		reqHandler = &ReqHandler{
			BindMap:        make(map[uint32]ignet.IRoute),
			ReqChanArr:     make([]chan ignet.IReq, global.Conf.WorkerPoolSize), // 处理请求的协程池 WorkerPool 中的 Worker 协程数
			WorkerPoolSize: global.Conf.WorkerPoolSize,                          // 处理请求的协程池 WorkerPool 中的 Worker 协程数
		}
	}
	return reqHandler
}

// BindRoute消息绑定路由
func (reqHandler *ReqHandler) BindRoute(msgId uint32, route ignet.IRoute) {
	if _, ok := reqHandler.BindMap[msgId]; ok {
		log.Println("Bind middleware error")
		return
	}
	reqHandler.BindMap[msgId] = route
}

// UseRoute消息使用路由
func (reqHandler *ReqHandler) UseRoute(req ignet.IReq) {
	route, ok := reqHandler.BindMap[req.GetMsgId()]
	if !ok {
		log.Println("Use middleware error")
		return
	}
	route.PreHandler(req)
	route.MsgHandler(req)
	route.PostHandler(req)
}

// StartWorkerPool 启动处理请求的协程池 WorkerPool
func (reqHandler *ReqHandler) StartWorkerPool() {
	for i := 0; i < int(reqHandler.WorkerPoolSize); i++ {
		// ReqChanLen请求队列 reqChan 的长度
		reqHandler.ReqChanArr[i] = make(chan ignet.IReq, global.Conf.ReqChanLen)
		// 启动处理请求的协程 Worker, 协程 c 负责处理 ReqChanArr[c] 中的请求
		go reqHandler.StartWorker(reqHandler.ReqChanArr[i])
	}
}

// StartWorker 启动处理请求的协程 Worker, 协程 c 负责处理 ReqChanArr[c] 中的请求
func (reqHandler *ReqHandler) StartWorker(reqChan chan ignet.IReq) {
	// 协程阻塞, 直到 reqChan 中有请求
	for {
		select {
		case req := <-reqChan: // ! Pop From Request Channel
			{
				reqHandler.UseRoute(req)
			}
		}
	}
}

// PushToReqChan请求队列 reqChan <-请求
func (reqHandler *ReqHandler) PushToReqChan(req ignet.IReq) {
	// 使用 connId 计算 workerId
	connId := req.GetConn().GetId()
	workerId /* == ReqChanArr index */ := connId % reqHandler.WorkerPoolSize
	log.Printf("Worker (coroutine) [%v/%v] <- Channel [%v/%v] <- Request (connection %v, message %v)\n",
		workerId, reqHandler.WorkerPoolSize, workerId, reqHandler.WorkerPoolSize, req.GetConn().GetId(), req.GetMsgId())
	// 请求队列 ReqChanArr[workerId] <-请求
	reqHandler.ReqChanArr[workerId] <- req
}
