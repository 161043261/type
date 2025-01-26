package main

import (
	"fmt"
	"net"
	"os"
)

const BUF_SIZE = 30

func main() {
	if len(os.Args) != 2 {

		//! broadcastPort 广播端口
		//! 服务器广播 UDP 数据包到网络中所有主机 (客户端) 的 3333 号端口
		//! 客户端监听 3333 号端口
		fmt.Fprintf(os.Stderr, "Usage: %s :<broadcastPort>\n", os.Args[0])
		os.Exit(1)
	}

	broadcastPort := os.Args[1]
	listener, err := net.ListenPacket("udp", broadcastPort)
	if err != nil {
		fmt.Fprintf(os.Stderr, "[ERROR] %s\n", err.Error())
		os.Exit(1)
	}
	buf := make([]byte, BUF_SIZE)
	for {
		nBytes, broadcastServerAddr, err := listener.ReadFrom(buf)
		if err != nil {
			fmt.Fprintf(os.Stderr, "[ERROR] %s\n", err.Error())
		}
		fmt.Println(broadcastServerAddr, "broadcasts:", string(buf[:nBytes]))
	}
}
