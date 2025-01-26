package main

import (
	"fmt"
	"net"
	"os"
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

	//* 客户端调用 conn.Read 方法, 读数据
	buf := make([]byte, 32)
	readBytes, err := conn.Read(buf)
	fmt.Printf("Echo from server: %s\n", string(buf[:readBytes]))
	conn.Close()
}
