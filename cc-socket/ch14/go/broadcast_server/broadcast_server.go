package main

import (
	"fmt"
	"net"
	"os"
	"time"
)

func main() {
	if len(os.Args) != 2 {
		//! 广播 IP 地址: 主机号全 1
		//! 广播端口
		//! 服务器广播 UDP 数据包到网络中所有主机 (客户端) 的 3333 号端口
		//! 客户端监听 3333 号端口
		fmt.Fprintf(os.Stderr, "Usage: %s <multicastGroupIp>:<multicastPort>\n", os.Args[0])
		os.Exit(1)
	}
	broadcastAddr := os.Args[1]
	conn, err := net.Dial("udp", broadcastAddr)

	/* broadcastAddr := net.UDPAddr{
		IP:   net.IPv4(255, 255, 255, 255),
		Port: 3333,
	}
	conn, err := net.DialUDP("udp", nil, &broadcastAddr) */

	if err != nil {
		fmt.Fprintf(os.Stderr, "[ERROR] %s\n", err.Error())
		os.Exit(1)
	}
	for {
		conn.Write([]byte("Hello World!"))
		time.Sleep(1 * time.Second)
	}
}
