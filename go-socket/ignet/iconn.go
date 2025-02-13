package ignet

import "net"

// IConn连接
type IConn interface {
	// Start 启动连接
	Start()

	// StartReader 读 goroutine, 从 conn.Socket 中读出数据包
	StartReader()

	// StartWriter 写 goroutine, 向 conn.Socket 写入数据包
	StartWriter()

	// GetId 获取连接 id
	GetId() uint32

	// GetRemoteAddr 获取客户端的 ip 地址和端口
	GetRemoteAddr() net.Addr

	// GetSocket 获取套接字
	GetSocket() *net.TCPConn

	// SendPacket 通过 PacketChan 将数据包发送给写 goroutine
	SendPacket(msgId uint32, msgData []byte) error

	// Stop 停止连接
	Stop()

	// SetProp 设置连接属性
	SetProp(key string, value any)

	// GetProp 获取连接属性
	GetProp(key string) (any, bool)

	// DelProp 删除连接属性
	DelProp(key string)
}
