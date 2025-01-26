package main

import (
	"bufio"
	"fmt"
	"net"
	"os"
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

	tcpConn, _ := conn.(*net.TCPConn) // 类型断言
	//! 获取 TCP 连接对应的 os.File 结构体指针
	fp, _ := tcpConn.File()
	reader := bufio.NewReader(fp) // 分配服务器读缓冲
	writer := bufio.NewWriter(fp) // 分配服务器写缓冲

	for {
		readBytes, err := reader.Read(buf) //! 服务器读缓冲 <-- socket 缓冲
		if err != nil {
			fmt.Fprintf(os.Stderr, "[ERROR] %s\n", err.Error())
			break
		}

		fmt.Println(conn.RemoteAddr().String(), string(buf[:readBytes]))
		writer.Write(buf[:readBytes]) //! 服务器写缓冲 --> socket 缓冲
		writer.Flush()                //! 清空服务器写缓冲
	}
	conn.Close()
	listener.Close()
}
