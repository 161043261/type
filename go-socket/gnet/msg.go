package gnet

// Msg 消息 Len, Id, Data
type Msg struct {
	Len  uint32 // 消息长度
	Id   uint32 // 消息 id
	Data []byte // 消息数据
}

// NewMsg 创建 Msg 结构体变量, 多例
func NewMsg(id uint32, data []byte) *Msg {
	return &Msg{
		Len:  uint32(len(data)), // 消息长度
		Id:   id,                // 消息 id
		Data: data,              // 消息数据
	}
}

// GetLen 获取消息长度
func (msg *Msg) GetLen() uint32 {
	return msg.Len
}

// GetId 获取消息 id
func (msg *Msg) GetId() uint32 {
	return msg.Id
}

// GetData 获取消息数据
func (msg *Msg) GetData() []byte {
	return msg.Data
}

// SetLen 设置消息长度
func (msg *Msg) SetLen(len uint32) {
	msg.Len = len
}

// SetId 设置消息 id
func (msg *Msg) SetId(id uint32) {
	msg.Id = id
}

// SetData 设置消息数据
func (msg *Msg) SetData(data []byte) {
	msg.Data = data
}
