package main

import (
	"fmt"
	"net"
	"os"
	"time"
)

func main() {
	if len(os.Args) != 2 {
		//! multicastGroupIp 多播组 IP 地址: D 类 IP 地址
		//! multicastPort 多播端口
		//! 服务器多播 UDP 数据包到多播组中所有主机 (客户端) 的 3333 号端口
		//! 客户端监听 3333 号端口
		fmt.Fprintf(os.Stderr, "Usage: %s <multicastGroupIp>:<multicastPort>\n", os.Args[0])
		os.Exit(1)
	}

	multicastAddr := os.Args[1]
	conn, err := net.Dial("udp", multicastAddr)
	if err != nil {
		fmt.Fprintf(os.Stderr, "[ERROR] %s\n", err.Error())
		os.Exit(1)
	}
	for {
		conn.Write([]byte("Hello World!"))
		time.Sleep(1 * time.Second)
	}
}
