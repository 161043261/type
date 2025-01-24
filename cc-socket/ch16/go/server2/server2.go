package main

// #include <sys/socket.h>
import "C"

import (
	"bufio"
	"fmt"
	"net"
	"os"
	"syscall"
)

const BUF_SIZE = 30

func main() {
	if len(os.Args) != 2 {
		fmt.Fprintf(os.Stderr, "Usage: %s :<serverPort>\n", os.Args[0])
		os.Exit(1)
	}

	//* 服务器调用 net.Listen 函数, 监听客户端的连接请求
	port := os.Args[1]
	listener, _ := net.Listen("tcp", port)

	//* 服务器调用 listener.Accept 方法, 接受客户端的连接请求 (服务器与客户端建立会话 Dialog)
	conn, _ := listener.Accept()

	tcpConn, _ := conn.(*net.TCPConn) // 类型断言
	readFp, _ := tcpConn.File()       //! 获取 TCP 连接对应的 os.File 结构体指针 readFp, 负责读数据
	fd := readFp.Fd()                 //! 将 os.File 结构体指针 readFp 转换为文件描述符 fd

	//! 复制 fd
	dupFd, _ := syscall.Dup(int(fd))

	//! 分离 IO 流
	writeFp := os.NewFile(uintptr(dupFd), "") //* 使用复制的 fd 创建 os.File 结构体指针 writeFp, 负责写数据
	reader := bufio.NewReader(readFp)         // 分配服务器读缓冲
	writer := bufio.NewWriter(writeFp)        // 分配服务器写缓冲

	writer.Write([]byte("[INFO] 1st\n")) // writeFp.Write([]byte("[INFO] 1st\n"))
	writer.Write([]byte("[INFO] 2nd\n")) // writeFp.Write([]byte("[INFO] 2nd\n"))
	writer.Write([]byte("[INFO] 3rd\n")) // writeFp.Write([]byte("[INFO] 3rd\n"))
	writer.Flush()

	//! 断开输出流, 仍可以从套接字中读数据
	C.shutdown(C.int(dupFd), C.SHUT_WR)

	//! 文件读; 写指针使用不同文件描述符创建
	//! 关闭所有文件指针时, 才会断开双向 IO 流
	writeFp.Close()

	buf := make([]byte, BUF_SIZE)
	readBytes, _ := reader.Read(buf) // readFp.Read(buf)
	fmt.Println(string(buf[:readBytes]))

	//! 断开输入流, 所有文件指针已关闭, 断开 socket 连接
	readFp.Close()
	//! 断开 socket 连接
	conn.Close()
}
