package main

import (
	"fmt"
	"net"
	"os"
)

func main() {
	if len(os.Args) != 2 {
		fmt.Fprintf(os.Stderr, "Usage: %s :<serverPort>\n", os.Args[0])
		os.Exit(1)
	}

	//* 服务器调用 net.Listen 函数, 监听客户端的连接请求
	port := os.Args[1]
	listener, err := net.Listen("tcp" /* also tcp4 */, port)
	if err != nil {
		fmt.Fprintf(os.Stderr, "[ERROR] %s\n", err.Error())
		os.Exit(1)
	}

	//* 服务器调用 listener.Accept 方法, 接受客户端的连接请求 (服务器与客户端建立会话 Dialogue)
	conn, err := listener.Accept()
	if err != nil {
		fmt.Fprintf(os.Stderr, "[ERROR] %s\n", err.Error())
		os.Exit(1)
	}

	//* 服务器调用 conn.Write 方法, 写数据
	message := []byte("Hello World!")
	conn.Write(message)
	conn.Close()
}
