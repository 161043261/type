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

	tcpConn, _ := conn.(*net.TCPConn) // 类型断言
	//! 获取 TCP 连接对应的 os.File 结构体指针
	fp, _ := tcpConn.File()
	fd := fp.Fd()

	//! 分离 IO 流
	readFp := os.NewFile(fd, "")
	writeFp := os.NewFile(fd, "")

	buf := make([]byte, BUF_SIZE)

	for {
		readBytes, err := readFp.Read(buf)
		if readBytes == 0 || err != nil {
			break
		}
		fmt.Println(string(buf[:readBytes]))
	}
	writeFp.WriteString("Thank you!")
	writeFp.Close()
	readFp.Close()
}
