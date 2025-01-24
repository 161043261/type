package gnet

import (
	"bytes"
	"encoding/binary"
	"errors"
	"fmt"

	"bronya.com/go-socket/global"
	"bronya.com/go-socket/ignet"
)

// MsgSerialize 消息序列化为数据包；数据包反序列化为消息
type MsgSerialize struct {
}

var msgSerializer *MsgSerialize

// NewMsgSerializer 创建 MsgSerialize 结构体变量, 单例
func NewMsgSerializer() *MsgSerialize {
	if msgSerializer == nil {
		msgSerializer = &MsgSerialize{}
	}
	return msgSerializer
}

// GetHeadLen 获取消息的 head 长度
func (msgSerializer *MsgSerialize) GetHeadLen() uint32 {
	return 8 // 4 bytes (Id uint32) + 4 bytes (Len uint32) = 8 bytes
}

// Pack 封包, 将消息序列化为数据包 (将 Msg 结构体变量序列化为 packet 字节数组)
func (msgSerializer *MsgSerialize) Pack(msg ignet.IMsg) ([]byte, error) {
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
	packet := buf.Bytes()
	return packet, nil
}

// Unpack 拆包, 将数据包反序列化为消息 (将 packet 字节数组反序列化为 Msg 结构体变量)
func (msgSerializer *MsgSerialize) Unpack(packet []byte) (ignet.IMsg, error) {
	reader := bytes.NewReader(packet)
	msg := &Msg{}
	// 从 byteArr 中读出 msgLen 到 Msg.Len
	if err := binary.Read(reader, binary.LittleEndian, &msg.Len); err != nil {
		return nil, err
	}
	// 从 byteArr 中读出 msgId 到 Msg.Id
	if err := binary.Read(reader, binary.LittleEndian, &msg.Id); err != nil {
		return nil, err
	}
	if msg.Len > global.Conf.MaxPacketSize {
		return nil, errors.New(fmt.Sprintf("Packet size (%vB) overflow", msg.Len))
	}
	return msg, nil
}
