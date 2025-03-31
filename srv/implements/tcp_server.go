package implements

import (
	"fmt"
	"log"
	"net"

	interfaces "bronya.com/srv/interfaces"
	"bronya.com/srv/utils"
)

// TcpServer tcp 服务器
type TcpServer struct {
	Proto      string                    // 协议
	HostIp     string                    // 监听 HostIp 的 tcp 连接请求
	Port       int                       // 监听的 tcp 端口
	MidWareMan interfaces.ITcpMidWareMan // 负责 tcp 消息绑定中间件、tcp 请求中的 tcp 消息使用中间件
}

// Start 启动 tcp 服务器
func (server *TcpServer) Start() {
	log.Printf("Start server %v, v%v\n", utils.Global.Name, utils.Global.Ver)
	log.Println("Copyright (c) bronya.com")
	log.Println("All rights reserved")
	go func() { //! 监听 HostIp 的 tcp 连接请求的 goroutine
		//! 解析 tcp 地址
		// 0.0.0.0:8080 监听所有 ip 的主机到本机 8080 端口的 tcp 连接请求
		tcpAddr, err := net.ResolveTCPAddr(server.Proto, fmt.Sprintf("%v:%v", server.HostIp, server.Port))
		if err != nil {
			log.Println("Resolve tcp addr err", err.Error())
			return
		}
		//! 监听 HostIp 的 tcp 连接请求
		tcpListener, err := net.ListenTCP(server.Proto, tcpAddr)
		if err != nil {
			log.Println("Listen tcp err", err.Error())
			return
		}
		log.Printf("Listening %v:%v\n", server.HostIp, server.Port)

		var id uint32 = 0
		//! 阻塞等待客户端的 tcp 连接请求
		for {
			conn, err := tcpListener.AcceptTCP() // 收到客户端的 tcp 连接请求
			if err != nil {
				log.Println("Accept tcp err", err.Error())
				continue
			}
			tcpConn := NewTcpConn(conn, id, server.MidWareMan)
			id++
			go tcpConn.Start() //! 处理 tcp 连接的 goroutine
		}
	}()
}

// Serve 运行 tcp 服务
func (server *TcpServer) Serve() {
	//! 启动 tcp 服务器，运行 tcp 服务
	server.Start()
	select {} //todo 阻塞等待
}

// Stop 停止 tcp 服务器
func (server *TcpServer) Stop() {
	//TODO
}

// BindMidWare tcp 消息绑定中间件
func (server *TcpServer) BindMidWare(msgId uint32, midWare interfaces.ITcpMidWare) {
	server.MidWareMan.BindMidWare(msgId, midWare) // tcp 消息绑定中间件
}

// NewTcpServer 创建 tcp 服务器
func NewTcpServer() interfaces.ITcpServer {
	server := TcpServer{
		Proto:      utils.Global.Proto,  // 协议
		HostIp:     utils.Global.HostIp, // 监听 HostIp 的 tcp 连接请求
		Port:       utils.Global.Port,   // 监听的 tcp 端口
		MidWareMan: NewTcpMidWareMan(),  // 负责 tcp 消息绑定中间件、tcp 请求中的 tcp 消息使用中间件
	}
	return &server
}
