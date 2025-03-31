package interfaces

// ITcpReq 封装 tcp 连接和 tcp 消息的 tcp 请求
type ITcpReq interface {
	// GetConn 获取 tcp 连接
	GetConn() ITcpConn

	// GetMsgLen 获取 tcp 消息的长度
	GetMsgLen() uint32

	// GetMsgId 获取 tcp 消息的 id
	GetMsgId() uint32

	// GetMsgData 获取 tcp 消息的数据
	GetMsgData() []byte
}
