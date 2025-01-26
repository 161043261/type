package main

import (
	"fmt"
	"net"
	"os"
	"strconv"
)

const BUF_SIZE = 30

// 分配随机端口
func AllocateRandomPort() (int, error) {
	listener, err := net.Listen("tcp", ":0")
	defer listener.Close()
	if err != nil {
		return 0, err
	}
	return listener.Addr().(*net.TCPAddr /* 类型断言 */).Port, nil
}

func main() {

	if len(os.Args) != 2 {
		fmt.Fprintf(os.Stderr, "Usage: %s <serverAddr>:<serverPort>\n", os.Args[0])
		os.Exit(1)
	}
	//* 客户端调用 net.ListenPacket 函数, 监听远端 (服务器) 的 UDP 连接请求
	randPort, _ := AllocateRandomPort()
	listener, err := net.ListenPacket("udp", ":"+strconv.Itoa(randPort))
	if err != nil {
		fmt.Fprintf(os.Stderr, "[ERROR] %s\n", err.Error())
		os.Exit(1)
	}

	send := make([]byte, BUF_SIZE) // 发送缓冲区
	recv := make([]byte, BUF_SIZE) // 接收缓冲区
	for {
		fmt.Print("Input: ")
		_ /* nBytes */, err := fmt.Scanln(&send)
		if err != nil {
			fmt.Fprintf(os.Stderr, "[ERROR] %s\n", err.Error())
			break
		}
		serverAddr, err := net.ResolveUDPAddr("udp", os.Args[1])
		//! 未连接的 UDP 套接字 - ReadFrom, WriteTo
		listener.WriteTo(send, serverAddr) //* 未连接的 UDP 套接字发送 UDP 数据报时需要指定远端 IP 地址
		readBytes, _ /* remoteAddr */, err := listener.ReadFrom(recv)
		if err != nil {
			fmt.Fprintf(os.Stderr, "[ERROR] %s\n", err.Error())
			break
		}
		// 等价于 fmt.Printf("Echo from server %s\n", recv)
		fmt.Printf("Echo from server %s\n", recv[:readBytes])
	}
}
