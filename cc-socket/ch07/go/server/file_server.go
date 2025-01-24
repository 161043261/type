package main

// #include <sys/socket.h>
import "C"

import (
	"bufio"
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
	listener, err := net.Listen("tcp4", port)
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
	var readme *os.File
	readme /* 文件 IO 流 */, err = os.Open("../README.md")
	if err != nil {
		fmt.Fprintf(os.Stderr, "[ERROR] %s\n", err.Error())
		os.Exit(1)
	}

	reader := bufio.NewReader(readme)
	send := make([]byte, BUF_SIZE)
	recv := make([]byte, BUF_SIZE)

	for {
		//* 将 ../../README.md 文件读出到 send 缓冲区
		byteCount, err := reader.Read(send) //* byteCount 读出的元素个数 (即读出的字节数)
		if err != nil {
			fmt.Fprintf(os.Stderr, "[ERROR] %s\n", err.Error())
		}
		// TCP 输出流
		//// fmt.Println(string(send[:byteCount]))
		if byteCount < BUF_SIZE {
			//! 从 send 缓冲区中读出 byteCount 个字节, 写入 clientSocketFd
			conn.Write(send[:byteCount])
			break //* 读出的字节数小于缓冲区大小 byteCount < BUF_SIZE; break;
		}

		conn.Write(send) //* 读出字节数等于缓冲区大小 byteCount == BUF_SIZE; continue;
	}

	tcpConn, _ := conn.(*net.TCPConn) //* 类型断言
	tcpSocketF, err := tcpConn.File() //* TCP 套接字文件
	defer tcpSocketF.Close()

	tcpSocketFd := tcpSocketF.Fd()                      //* TCP 套接字文件描述符
	C.shutdown(C.int(tcpSocketFd), C.SHUT_WR /* 0x1 */) //! 调用 c 库函数 shutdown 断开输出流
	//// conn.Write([]byte("msg")) // 服务器的输出流已断开, 服务器无法再发送数据

	// TCP 输入流
	readBytes, _ := conn.Read(recv) //* 输出流断开, 输入流未断开, 可以从 socket channel 中读
	fmt.Printf("Message from client: %s\n", recv[:readBytes])
	tcpSocketF.Close()
	conn.Close()
	listener.Close()
}
