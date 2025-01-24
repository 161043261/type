package gnet

import (
	"bronya.com/go-socket/global"
	"bronya.com/go-socket/ignet"
	"context"
	"fmt"
	"log"
	"net"
	"os/signal"
	"syscall"
)

// Server 服务器
type Server struct {
	HostIp         string                 // 监听 HostIp 的主机到本机 Port 端口的连接请求
	Port           int                    // 监听 HostIp 的主机到本机 Port 端口的连接请求
	ConnMan        ignet.IConnMan         // 管理连接
	ReqHandler     ignet.IReqHandle       // 消息绑定路由；消息使用路由
	AfterConnStart func(conn ignet.IConn) // ! 启动连接后执行的钩子函数
	BeforeConnStop func(conn ignet.IConn) // ! 停止连接前执行的钩子函数
}

// NewServer 创建 Server 结构体变量, 单例
func NewServer() ignet.IServer {
	if global.Server == nil {
		global.Server = &Server{
			HostIp:     global.Conf.HostIp, // 监听 HostIp 的主机到本机 Port 端口的连接请求
			Port:       global.Conf.Port,   // 监听 HostIp 的主机到本机 Port 端口的连接请求
			ConnMan:    NewConnMan(),       // 管理连接
			ReqHandler: NewReqHandler(),    // 消息绑定路由；消息使用路由
		}
	}
	return global.Server
}

// Start 启动服务器
func (server *Server) Start() {
	log.Println("Copyright (c) bronya.com")
	log.Println("All rights reserved")
	// ! 创建一个接收 os 信号的上下文 ctx, 收到 os 信号时, ctx.Done() 空通道关闭, 可执行 <-ctx.Done()
	ctx, cancel := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer cancel()

	// ! 在新协程中启动服务器, 主协程不会阻塞, 继续运行
	go func() { // ! 监听 HostIp 的主机到本机 Port 端口的连接请求的 goroutine
		// ! 解析地址
		// 0.0.0.0:8080 监听所有 ip 的主机到本机 8080 端口的连接请求
		addr, err := net.ResolveTCPAddr("tcp4", fmt.Sprintf("%v:%v", server.HostIp, server.Port))
		if err != nil {
			log.Println("Resolve address error", err.Error())
			return
		}
		// ! 监听 HostIp 的主机到本机 Port 端口的连接请求
		listener, err := net.ListenTCP("tcp4", addr /* HostIp:Port */)
		if err != nil {
			log.Println("Listen error", err.Error())
			return
		}
		log.Printf("Start server %v version %v done\n", global.Conf.Name, global.Conf.Ver)
		log.Printf("Listening on %v:%v\n", server.HostIp, server.Port)
		// ! 启动处理请求的协程池 WorkerPool
		server.ReqHandler.StartWorkerPool()

		var connId uint32 = 0
		// ! 协程阻塞, 直到有客户端的连接请求
		for {
			socket, err := listener.AcceptTCP() // 收到客户端的连接请求
			if err != nil {
				log.Println("Accept error", err.Error())
				continue
			}
			// ! 当前连接数 >= 最大连接数 ?
			if server.ConnMan.GetConnNum() >= global.Conf.MaxConnNum {
				log.Println("Number of connections overflow")
				// ! 当前连接数 >= 最大连接数
				socket.Close() // 关闭新连接
				continue
			}
			// 当前连接数 < 最大连接数, 建立新连接
			conn := NewConn(socket, connId, server.ReqHandler)
			connId++
			go conn.Start() // ! 处理连接的 goroutine
		}
	}()

	// ! 收到 os 信号时, ctx.Done() 空通道关闭, 可执行 <-ctx.Done()
	<-ctx.Done()
	server.Stop()
}

// GetConnMan 获取 connMan 管理连接
func (server *Server) GetConnMan() ignet.IConnMan {
	return server.ConnMan
}

// BindRoute 消息绑定路由
func (server *Server) BindRoute(msgId uint32, route ignet.IRoute) {
	server.ReqHandler.BindRoute(msgId, route) // 消息绑定路由
}

// Stop 停止服务器
func (server *Server) Stop() {
	server.ConnMan.DelAllConn()
	log.Printf("Stop server %v version %v done\n", global.Conf.Name, global.Conf.Ver)
}

// UseAfterConnStart 注册 AfterConnStart 方法启动连接后执行的钩子函数
func (server *Server) UseAfterConnStart(hook func(conn ignet.IConn)) {
	server.AfterConnStart = hook
}

// DoAfterConnStart 调用 AfterConnStart 方法启动连接后执行的钩子函数
func (server *Server) DoAfterConnStart(conn ignet.IConn) {
	if server.AfterConnStart == nil {
		return
	}
	server.AfterConnStart(conn)
	log.Println("After connection start. Hook done")
}

// UseBeforeConnStop 注册 BeforeConnStop 方法停止连接前执行的钩子函数
func (server *Server) UseBeforeConnStop(hook func(conn ignet.IConn)) {
	server.BeforeConnStop = hook
}

// DoBeforeConnStop 调用 BeforeConnStop 方法停止连接前执行的钩子函数
func (server *Server) DoBeforeConnStop(conn ignet.IConn) {
	if server.BeforeConnStop == nil {
		return
	}
	server.BeforeConnStop(conn)
	log.Println("Before connection stop. Hook done")
}
