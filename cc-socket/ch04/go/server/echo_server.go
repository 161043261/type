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

	//* 服务器调用 net.Listen 函数, 监听客户端的连接请求
	port := os.Args[1]
	listener, err := net.Listen("tcp", port)
	if err != nil {
		fmt.Fprintf(os.Stderr, "[ERROR] %s\n", err.Error())
		os.Exit(1)
	}
	//* 服务器调用 listener.Accept 方法, 接受客户端的连接请求 (服务器与客户端建立会话 Dialog)
	conn, err := listener.Accept()
	if err != nil {
		fmt.Fprintf(os.Stderr, "[ERROR] %s\n", err.Error())
		os.Exit(1)
	}
	buf := make([]byte, BUF_SIZE)
	for {
		len, err := conn.Read(buf)
		if err != nil {
			fmt.Fprintf(os.Stderr, "[ERROR] %s\n", err.Error())
			break
		}
		conn.Write(buf[:len])
	}
	conn.Close()     // java SocketConnection
	listener.Close() // java ServerSocketConnection
}
