package ignet

// IMsgSerializer 消息序列化为数据包；数据包反序列化为消息
type IMsgSerializer interface {
	// GetHeadLen 获取消息的 head 长度
	GetHeadLen() uint32

	// Pack 封包, 将消息序列化为数据包 (将 Msg 结构体变量序列化为 packet 字节数组)
	Pack(msg IMsg) ([]byte, error)

	// Unpack 拆包, 将数据包反序列化为消息 (将 packet 字节数组反序列化为 Msg 结构体变量)
	Unpack(packet []byte) (IMsg, error)
}
