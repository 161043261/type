package utils

import (
	"encoding/json"
	"log"
	"os"
)

type IGlobal struct {
	Name          string // 服务器名
	Ver           string // 服务器版本
	HostIp        string // 监听 HostIp 的 tcp 连接请求
	Port          int    // 监听的端口
	Proto         string // 协议
	TcpMaxConn    int    // tcp 最大连接数
	TcpMaxPacSize uint32 // tcp 最大数据包大小
}

var Global *IGlobal

// ! init 函数只执行 1 次
func init() {
	Global = &IGlobal{
		Name:          "Proxy",
		Ver:           "1.0",
		HostIp:        "0.0.0.0",
		Port:          8080,
		Proto:         "tcp4",
		TcpMaxConn:    1,
		TcpMaxPacSize: 512,
	}
	Global.Load()
}

func (*IGlobal) Load() {
	byteArr, err := os.ReadFile("./tcp_settings.json")
	if err != nil {
		log.Printf("Read file err %v", err.Error())
		return
	}
	// 解析 json 数据到 IGlobal 结构体变量
	err = json.Unmarshal(byteArr, Global)
}
