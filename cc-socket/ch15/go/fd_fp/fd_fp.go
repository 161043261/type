package main

import (
	"bufio"
	"fmt"
	"os"
	"syscall"
)

func main() {
	//! O_CREAT 文件不存在则创建文件
	//! O_RDONLY 只读; O_WRONLY 只写; O_TRUNC 重写
	fd /* int */, _ := syscall.Open("../../README.txt", os.O_WRONLY|os.O_CREATE|os.O_TRUNC, 0755)
	fmt.Println("fd ==> fp, fd =", fd) // fd = 3
	//! 调用 os.NewFile 函数, 将文件描述符 fd 转换为 os.File 结构体指针 fp
	var fp *os.File = os.NewFile(uintptr(fd), "")
	writer := bufio.NewWriter(fp)
	writer.WriteString("Convert fd to fp using ```var fp *os.File = os.NewFile(uintptr(fd), '')```\n")
	writer.Flush() // 清空写缓冲
	fp.Close()
	fp, _ = os.OpenFile("../../README.txt", os.O_WRONLY|os.O_APPEND, 0755)
	//! 调用 fp.Fd 方法, 将 os.File 结构体指针 fp 转换为文件描述符 fd
	var fd_ uintptr = fp.Fd()
	fmt.Println("fp ==> fd, fd =", fd_)
	syscall.Write(int(fd_), []byte("Convert fp to fd using ```var fd uintptr = fp.Fd()```\n"))
	fp.Close()
}
