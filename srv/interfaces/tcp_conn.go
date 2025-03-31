package interfaces

import "net"

// ITcpConn tcp 连接
type ITcpConn interface {
	// Start 启动 tcp 连接
	Start()

	// Stop 停止 tcp 连接
	Stop()

	// GetId 获取 tcp 连接 id
	GetId() uint32

	// GetRemoteAddr 获取客户端的 ip 地址和端口
	GetRemoteAddr() net.Addr

	// GetSocket 获取 tcp 套接字
	GetSocket() *net.TCPConn

	// SendPac 发送 tcp 数据包
	SendPac(msgId uint32, msgData []byte) error
}
