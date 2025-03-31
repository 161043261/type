package implements

// TcpMsg tcp 消息
type TcpMsg struct {
	Len  uint32
	Id   uint32
	Data []byte
}

// GetLen 获取 tcp 消息长度
func (msg *TcpMsg) GetLen() uint32 {
	return msg.Len
}

// GetId 获取 tcp 消息 id
func (msg *TcpMsg) GetId() uint32 {
	return msg.Id
}

// GetData 获取 tcp 消息数据
func (msg *TcpMsg) GetData() []byte {
	return msg.Data
}

// SetLen 设置 tcp 消息长度
func (msg *TcpMsg) SetLen(len uint32) {
	msg.Len = len
}

// SetId 设置 tcp 消息 id
func (msg *TcpMsg) SetId(id uint32) {
	msg.Id = id
}

// SetData 设置 tcp 消息数据
func (msg *TcpMsg) SetData(data []byte) {
	msg.Data = data
}

// NewTcpMsg 创建 tcp 消息，多例
func NewTcpMsg(id uint32, data []byte) *TcpMsg {
	return &TcpMsg{
		Len:  uint32(len(data)),
		Id:   id,
		Data: data,
	}
}
