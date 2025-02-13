package ignet

// IReq 请求封装连接和消息
type IReq interface {
	// GetConn 获取连接
	GetConn() IConn

	// GetMsgLen 获取消息长度
	GetMsgLen() uint32

	// GetMsgId 获取消息 id
	GetMsgId() uint32

	// GetMsgData 获取消息数据
	GetMsgData() []byte
}
