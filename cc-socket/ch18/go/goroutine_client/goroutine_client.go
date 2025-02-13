package main

import (
	"fmt"
	"net"
	"os"
	"strings"
	"sync"
)

const (
	BUF_SIZE   = 30
	CLIENT_CAP = 3
)

func main() {
	var serverAddr string
	if len(os.Args) != 2 {
		fmt.Fprintf(os.Stderr, "[WARN] Usage: %s <serverAddr>:<serverPort>\n", os.Args[0])
		serverAddr = "127.0.0.1:3333"
	} else {
		serverAddr = os.Args[1]
	}
	//* 客户端调用 net.Dial 函数, 向服务器发送连接请求
	conn, err := net.Dial("tcp", serverAddr)
	if err != nil {
		fmt.Fprintf(os.Stderr, "[ERROR] %s\n", err.Error())
		os.Exit(1)
	}
	//! 主协程创建 WaitGroup 实例 wg
	var wg sync.WaitGroup
	//! 主协程调用 wg.Add(n) 方法, n 是协程组中, 等待的协程数量
	wg.Add(2)
	go sendMsg(&conn, &wg)
	go recvMsg(&conn, &wg)
	//! 主协程调用 wg.Wait() 方法, 等待协程组中的每个协程运行结束
	wg.Wait()
}

func sendMsg(conn *net.Conn, wg *sync.WaitGroup) {
	//! 协程组的每个协程函数中 `defer wg.Done()`
	defer wg.Done()
	buf := make([]byte, BUF_SIZE)
	for {
		fmt.Scanf("%s\n", &buf)
		if strings.ToLower(string(buf)) == "q" {
			(*conn).Close()
			break
		}
		(*conn).Write(buf)
	}

}

func recvMsg(conn *net.Conn, wg *sync.WaitGroup) {
	//! 协程组的每个协程函数中 `defer wg.Done()`
	defer wg.Done()
	buf := make([]byte, BUF_SIZE)
	for {
		readLen, err := (*conn).Read(buf)
		if err != nil {
			fmt.Fprintf(os.Stderr, "[ERROR] %v\n", err.Error())
			return
		}
		fmt.Printf("[INFO] Echo from server %s\n", buf[:readLen])
	}
}
