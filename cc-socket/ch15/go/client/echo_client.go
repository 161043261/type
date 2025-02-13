package main

import (
	"bufio"
	"fmt"
	"net"
	"os"
	"strings"
)

//!  *--- 服务器读缓冲 <-- socket 缓冲 <-- 客户端写缓冲 <--*
//!  |                                                     |
//!  |  *--------*                            *--------* send
//! buf | 服务器 |                            | 客户端 |
//!  |  *--------*                            *--------* recv
//!  |                                                     |
//!  *--> 服务器写缓冲 --> socket 缓冲 --> 客户端读缓冲 ---*

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

	tcpConn, _ := conn.(*net.TCPConn) // 类型断言
	//! 获取 TCP 连接对应的 os.File 结构体指针
	fp, _ := tcpConn.File()
	reader := bufio.NewReader(fp) // 分配客户端读缓冲
	writer := bufio.NewWriter(fp) // 分配客户端写缓冲

	for {
		fmt.Print("Input: ")
		fmt.Scanf("%s", &send)
		if strings.ToLower(string(send)) == "q" {
			break
		}
		_ /* writeBytes */, err := writer.Write(send) //! socket 缓冲 <-- 客户端写缓冲
		if err != nil {
			fmt.Fprintf(os.Stderr, "[ERROR] %s\n", err.Error())
			os.Exit(1)
		}
		writer.Flush() //! 清空客户端写缓冲

		readBytes, err := reader.Read(recv) //! socket 缓冲 --> 客户端读缓冲
		if err != nil {
			fmt.Fprintf(os.Stderr, "[ERROR] %s\n", err.Error())
			os.Exit(1)
		}
		fmt.Printf("Echo from server %s\n", recv[:readBytes])
	}
	conn.Close()
}
