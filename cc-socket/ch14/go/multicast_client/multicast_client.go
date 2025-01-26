package main

import (
	"fmt"
	"net"
	"os"
)

const BUF_SIZE = 30

func main() {
	if len(os.Args) != 2 {
		//! multicastGroupIp 多播组 IP 地址: D 类 IP 地址
		//! multicastPort 多播端口
		//! 服务器多播 UDP 数据包到多播组中所有主机 (客户端) 的 3333 号端口
		//! 客户端监听 3333 号端口
		fmt.Fprintf(os.Stderr, "Usage: %s <multicastGroupIp>:<multicastPort>\n", os.Args[0])
		os.Exit(1)
	}

	multicastAddr, _ := net.ResolveUDPAddr("udp", os.Args[1])
	listener, err := net.ListenMulticastUDP("udp", nil /* 0.0.0.0 */, multicastAddr)
	if err != nil {
		fmt.Fprintf(os.Stderr, "[ERROR] %s\n", err.Error())
		os.Exit(1)
	}

	buf := make([]byte, BUF_SIZE)
	for {
		nBytes, multicastServerAddr, err := listener.ReadFromUDP(buf)
		if err != nil {
			fmt.Fprintf(os.Stderr, "[ERROR] %s\n", err.Error())
		}
		fmt.Println(multicastServerAddr, "multicasts:", string(buf[:nBytes]))
	}
}
