package main

import (
	"fmt"
	"net"
	"os"
	"sync"
)

const (
	BUF_SIZE   = 30
	CLIENT_CAP = 3
)

var connArrLen = 0
var connArr [CLIENT_CAP]*net.Conn
var mut sync.Mutex

func main() {
	var port string

	if len(os.Args) != 2 {
		fmt.Fprintf(os.Stderr, "[WARN] Usage: %s :<serverPort>\n", os.Args[0])
		port = ":3333"
	} else {
		port = os.Args[1]
	}
	//* 服务器调用 net.Listen 函数, 监听客户端的连接请求
	listener, err := net.Listen("tcp", port)
	if err != nil {
		fmt.Fprintf(os.Stderr, "[ERROR] %s\n", err.Error())
		os.Exit(1)
	}
	for {
		conn, err := listener.Accept()
		if err != nil {
			fmt.Fprintf(os.Stderr, "[ERROR] %s\n", err.Error())
			break
		}
		// err == nil
		mut.Lock() // 加锁
		connArr[connArrLen] = &conn
		connArrLen += 1
		fmt.Printf("[DEBUG] connArrLen = %v\n", connArrLen)
		mut.Unlock() // 解锁
		go clientHandler(&conn)
		fmt.Printf("Connect client IP: %v\n", conn.RemoteAddr().String())
	}
	listener.Close()
}

func clientHandler(conn *net.Conn) {
	fp, _ := (*conn).(*net.TCPConn).File()
	fd := fp.Fd()

	buf := make([]byte, BUF_SIZE)
	for {
		readLen, err := (*conn).Read(buf)
		if err != nil {
			mut.Lock()
			fmt.Fprintf(os.Stderr, "[ERROR] %s\n", err.Error())
			for i := 0; i < connArrLen; i++ {
				if conn != connArr[i] {
					continue
				}
				// conn == connArr[i]
				for i < connArrLen-1 {
					connArr[i] = connArr[i+1]
					i++
				}
				connArrLen -= 1
				fmt.Printf("[DEBUG] connArrLen = %v\n", connArrLen)
				break
			}
			mut.Unlock()
			(*conn).Close()
			return
		}
		// err == nil
		mut.Lock() // 加锁
		fmt.Printf("[DEBUG] fd = %v, msg = %s\n", int(fd), buf[:readLen])
		for i := 0; i < connArrLen; i++ {
			(*connArr[i]).Write(buf[:readLen])
		}
		mut.Unlock() // 解锁
	}
}
