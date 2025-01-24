package global

import (
	"bronya.com/go-socket/ignet"
	"encoding/json"
	"log"
	"os"
)

type conf struct {
	Name             string // 服务器名
	Ver              string // 服务器版本
	HostIp           string // 监听 HostIp 的主机到本机 Port 端口的连接请求
	Port             int    // 监听 HostIp 的主机到本机 Port 端口的连接请求
	MaxConnNum       int    // 最大连接数
	MaxPacketSize    uint32 // 最大数据包大小
	WorkerPoolSize   uint32 // 处理请求的协程池 WorkerPool 中的 Worker 协程数
	ReqChanLen       uint32 // 请求队列 reqChan 的长度
	UseMsgSerializer bool   // 从 conn.Socket 中读出数据包后, 反序列化为 Msg 结构体变量
}

var Conf *conf           // 配置
var Server ignet.IServer // 服务器

func init() {
	Conf = &conf{
		Name:             "Proxy",
		Ver:              "1.0",
		HostIp:           "0.0.0.0",
		Port:             8080,
		MaxConnNum:       1024,
		MaxPacketSize:    4096,
		WorkerPoolSize:   10,
		ReqChanLen:       1024,
		UseMsgSerializer: true,
	}
}

func ReadConf(path string) {
	byteArr, err := os.ReadFile(path)
	if err != nil {
		log.Printf("Read %v error %v\n", path, err.Error())
	}
	err = json.Unmarshal(byteArr, Conf) // 解析 json 数据到 Conf
	if err != nil {
		log.Println("Unmarshal error", err.Error())
	}
	log.Printf("Read %v done\n", path)
}
