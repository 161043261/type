package interfaces

// ITcpMsg tcp 消息
type ITcpMsg interface {
	// GetLen 获取 tcp 消息长度
	GetLen() uint32

	// GetId 获取 tcp 消息 id
	GetId() uint32

	// GetData 获取 tcp 消息数据
	GetData() []byte

	// SetLen 设置 tcp 消息长度
	SetLen(uint32)

	// SetId 设置 tcp 消息 id
	SetId(uint32)

	// SetData 设置 tcp 消息数据
	SetData([]byte)
}
