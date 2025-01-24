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
	serverAddr := os.Args[1]
	//* 客户端调用 net.Dial 函数, 向服务器发送连接请求
	conn, err := net.Dial("tcp", serverAddr)
	if err != nil {
		fmt.Fprintf(os.Stderr, "[ERROR] %s\n", err.Error())
		os.Exit(1)
	}
	send := make([]byte, BUF_SIZE)
	recv := make([]byte, BUF_SIZE)
	for {
		fmt.Print("Input: ")
		fmt.Scanf("%s\n", &send)
		_ /* writeBytes */, err := conn.Write(send)
		if err != nil {
			fmt.Fprintf(os.Stderr, "[ERROR] %s\n", err.Error())
			break
		}
		readBytes, err := conn.Read(recv)
		if err != nil {
			fmt.Fprintf(os.Stderr, "[ERROR] %s\n", err.Error())
			break
		}
		fmt.Printf("Echo from server %s\n", recv[:readBytes])
	}
	conn.Close()
}
