package main

import (
	"fmt"
	"io"
	"net"
	"os"
	"strings"
)

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

	//* 客户端调用 conn.Read 方法, 每次读出一个字符
	buf := make([]byte, 1) // 缓冲区大小为 1
	var msgBuilder strings.Builder
	totalBytes := 0
	for {
		readBytes, err := conn.Read(buf)
		totalBytes += readBytes
		if err == io.EOF {
			break
		}
		msgBuilder.WriteByte(buf[0])
	}
	fmt.Printf("Echo from server: %v\n", msgBuilder.String())
	fmt.Printf("Message length: %v\n", totalBytes)
}
