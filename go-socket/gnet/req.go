package gnet

import "bronya.com/go-socket/ignet"

// Req 封装连接和消息的请求
type Req struct {
	Conn ignet.IConn // 连接
	Msg  ignet.IMsg  // 消息
}

// GetConn 获取连接
func (req *Req) GetConn() ignet.IConn {
	return req.Conn
}

// GetMsgLen 获取消息长度
func (req *Req) GetMsgLen() uint32 {
	return req.Msg.GetLen()
}

// GetMsgId 获取消息 id
func (req *Req) GetMsgId() uint32 {
	return req.Msg.GetId()
}

// GetMsgData 获取消息数据
func (req *Req) GetMsgData() []byte {
	return req.Msg.GetData()
}
