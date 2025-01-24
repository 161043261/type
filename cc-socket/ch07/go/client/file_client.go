package main

import (
	"fmt"
	"io"
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

	//! 创建 ../../README.txt 文件 IO 流
	readmeTxt, _ := os.OpenFile("../../README.txt" /*filepath*/, os.O_CREATE|os.O_RDWR, 0666)

	recv := make([]byte, BUF_SIZE)
	readCnt := 0
	for {
		readCnt, err = conn.Read(recv)
		if err == io.EOF || readCnt <= 0 {
			break
		}
		//// fmt.Println(readCnt, recv[:readCnt])
		readmeTxt.Write(recv[:readCnt])
	}

	fmt.Println("RW ok")
	// TCP 输出流
	//// nBytes, err := conn.Read(recv) // 服务器的输出流已断开, 客户端无法再接收数据
	conn.Write([]byte("Thank you") /* send */)
	readmeTxt.Close()
	conn.Close()
}
