package implements

import (
	"bronya.com/srv/interfaces"
	"bronya.com/srv/utils"
	"bytes"
	"encoding/binary"
	"errors"
)

// TcpPacMan 负责 tcp 消息序列化为 tcp 数据包、tcp 数据包反序列化为 tcp 消息
type TcpPacMan struct {
}

// NewTcpPacMan 创建 TcpPacMan 结构体变量，多例
func NewTcpPacMan() *TcpPacMan {
	return &TcpPacMan{}
}

// GetHeadLen 获取 tcp 数据包的 head 长度
func (pacMan *TcpPacMan) GetHeadLen() uint32 {
	return 8 // 4 bytes (Id uint32) + 4 bytes (Len uint32) = 8 bytes
}

// Pack 封包，tcp 消息 序列化为 tcp 数据包
// 将 msg 结构体变量序列化为 packet 字节数组
func (pacMan *TcpPacMan) Pack(msg interfaces.ITcpMsg) ([]byte, error) {
	buf /* writer */ := bytes.NewBuffer([]byte{})
	// 向 buf 中 写入 msgLen
	if err := binary.Write(buf, binary.LittleEndian, msg.GetLen()); err != nil {
		return nil, err
	}
	// 向 buf 中 写入 msgId
	if err := binary.Write(buf, binary.LittleEndian, msg.GetId()); err != nil {
		return nil, err
	}
	// 向 buf 中写入 msgData
	if err := binary.Write(buf, binary.LittleEndian, msg.GetData()); err != nil {
		return nil, err
	}
	pac := buf.Bytes()
	return pac, nil
}

// Unpack 拆包，即 tcp 数据包反序列化为 tcp 消息
// 将 packet 字节数组反序列化为 msg 结构体变量
func (pacMan *TcpPacMan) Unpack(pac []byte) (interfaces.ITcpMsg, error) {
	reader := bytes.NewReader(pac)
	msg := &TcpMsg{}
	// 从 byteArr 中读出 msgLen 到 Msg.Len
	if err := binary.Read(reader, binary.LittleEndian, &msg.Len); err != nil {
		return nil, err
	}
	// 从 byteArr 中读出 msgId 到 Msg.Id
	if err := binary.Read(reader, binary.LittleEndian, &msg.Id); err != nil {
		return nil, err
	}
	if msg.Len > utils.Global.TcpMaxPacSize {
		return nil, errors.New("tcp packet too big")
	}
	return msg, nil
}
