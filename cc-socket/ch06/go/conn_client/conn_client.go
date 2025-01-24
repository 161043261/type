package main

import (
	"fmt"
	"net"
	"os"
)

const BUF_SIZE = 30

func main() {
	if len(os.Args) != 2 {
		fmt.Fprintf(os.Stderr, "Usage: %s <serverAddr>:<serverPort>\n", os.Args[0])
		os.Exit(1)
	}
	serverAddrStr /* remoteAddr */ := os.Args[1]
	//* 客户端调用 net.ListenPacket 函数, 监听远端 (服务器) 的 UDP 连接请求
	// listener, err := net.ListenPacket("udp", port)
	serverAddr /* remoteAddr */, _ := net.ResolveUDPAddr("udp", serverAddrStr)
	//! 建立 UDP 会话, 推荐
	conn, err := net.DialUDP("udp", nil /* 自动分配端口 */, serverAddr)
	if err != nil {
		fmt.Fprintf(os.Stderr, "[ERROR] %s\n", err.Error())
		os.Exit(1)
	}
	send := make([]byte, BUF_SIZE)
	recv := make([]byte, BUF_SIZE)
	for {
		fmt.Print("Input: ")
		/* nBytes, err := */ fmt.Scanln(&send)
		//! 已连接的 UDP 套接字 - Write, Read
		conn.Write(send) // 已连接的 UDP 套接字发送 UDP 数据报时无需指定远端 IP 地址
		readBytes, err := conn.Read(recv)
		if err != nil {
			fmt.Fprintf(os.Stderr, "[ERROR] %s\n", err.Error())
		}
		// 等价于 fmt.Printf("Echo from server %s\n", recv[:readBytes])
		fmt.Printf("Echo from server %s\n", recv[:readBytes])
	}
}
