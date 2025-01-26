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

	tcpConn, _ := conn.(*net.TCPConn) // 类型断言
	readFp, _ := tcpConn.File()       //! 获取 TCP 连接对应的 os.File 结构体指针 readFp, 负责读数据
	writeFp, _ := tcpConn.File()      //! 获取 TCP 连接对应的 os.File 结构体指针 writeFp, 负责写数据

	writeFp.Write([]byte("[INFO] 1st\n")) // writeFp.WriteString("[INFO] 1st\n")
	writeFp.Write([]byte("[INFO] 2nd\n")) // writeFp.WriteString("[INFO] 2nd\n")
	writeFp.Write([]byte("[INFO] 3rd\n")) // writeFp.WriteString("[INFO] 3rd\n")

	//! 文件读; 写指针使用相同文件描述符创建
	//! 关闭任一文件指针时, 都会都会断开双向 IO 流
	writeFp.Close() //! 同时断开输入/输出流, 不能读写数据

	buf := make([]byte, BUF_SIZE)
	readBytes, _ := readFp.Read(buf)
	fmt.Println(string(buf[:readBytes]))
	readFp.Close()
	conn.Close()
}
