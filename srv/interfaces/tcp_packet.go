package interfaces

// ITcpPacMan 负责 tcp 消息序列化为 tcp 数据包、tcp 数据包反序列化为 tcp 消息
type ITcpPacMan interface {
	// GetHeadLen 获取 tcp 数据包的 head 长度
	GetHeadLen() uint32

	// Pack 封包，tcp 消息 序列化为 tcp 数据包
	// 将 msg 结构体变量序列化为 packet 字节数组
	Pack(msg ITcpMsg) ([]byte, error)

	// Unpack 拆包，即 tcp 数据包反序列化为 tcp 消息
	// 将 packet 字节数组反序列化为 msg 结构体变量
	Unpack(pac []byte) (ITcpMsg, error)
}
