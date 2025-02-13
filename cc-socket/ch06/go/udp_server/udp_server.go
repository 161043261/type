package main

import (
	"fmt"
	"net"
	"os"
)

const BUF_SIZE = 30

func main() {
	if len(os.Args) != 2 {
		fmt.Fprintf(os.Stderr, "Usage: %s :<serverPort>\n", os.Args[0])
		os.Exit(1)
	}

	port := os.Args[1]
	//* 服务器调用 net.ListenPacket 函数, 监听远端 (客户端) 的 UDP 连接请求
	listener, err := net.ListenPacket("udp", port)
	if err != nil {
		fmt.Fprintf(os.Stderr, "[ERROR] %s\n", err.Error())
		os.Exit(1)
	}
	buf := make([]byte, BUF_SIZE) // 接收缓冲区
	for {
		len, clientAddr /* remoteAddr */, err := listener.ReadFrom(buf)
		if err != nil {
			fmt.Fprintf(os.Stderr, "[ERROR] %s\n", err.Error())
			os.Exit(1)
		}
		fmt.Printf("clientAddr: %s\n", clientAddr.String())
		listener.WriteTo(buf[:len], clientAddr) // echo
	}
	// listener.Close() // 未连接的 UDP 套接字不需要断开连接
}
