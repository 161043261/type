package ignet

// IMsg消息 msgLen, msgId, msgData
type IMsg interface {
	// GetLen 获取消息长度
	GetLen() uint32

	// GetId 获取消息 id
	GetId() uint32

	// GetData 获取消息数据
	GetData() []byte

	// SetLen 设置消息长度
	SetLen(uint32)

	// SetId 设置消息 id
	SetId(uint32)

	// SetData 设置消息数据
	SetData([]byte)
}
