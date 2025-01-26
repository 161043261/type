package main

import (
	"bufio"
	"fmt"
	"os"
	"syscall"
	"time"
)

const BUF_SIZE int = 3

func sysIo() {
	start := time.Now()
	readFd, _ := syscall.Open("../../README.md", os.O_RDONLY, 0755)
	//! O_CREAT 文件不存在则创建文件
	//! O_RDONLY 只读; O_WRONLY 只写; O_TRUNC 重写
	writeFd, _ := syscall.Open("../../README.txt", os.O_WRONLY|os.O_CREATE|os.O_TRUNC, 0755)
	buf := make([]byte, BUF_SIZE)
	for {
		nBytes, _ := syscall.Read(readFd, buf)
		if nBytes == 0 {
			break
		}
		syscall.Write(writeFd, buf[:nBytes])
	}
	syscall.Close(readFd)
	syscall.Close(writeFd)
	total := time.Since(start)
	fmt.Println("Sys IO uses", total)
}

func stdIo() {
	start := time.Now()
	readFp, _ := os.OpenFile("../../README.md", os.O_RDONLY, 0755)
	writeFp, _ := os.OpenFile("../../README.txt", os.O_WRONLY|os.O_CREATE|os.O_TRUNC, 0755)
	reader := bufio.NewReader(readFp)
	writer := bufio.NewWriter(writeFp)
	buf := make([]byte, BUF_SIZE)
	for {
		nBytes, _ := reader.Read(buf)
		if nBytes == 0 {
			break
		}
		writer.Write(buf[:nBytes])
	}
	readFp.Close()
	writeFp.Close()
	total := time.Since(start)
	fmt.Println("Std IO total", total)
}

func main() {
	sysIo()
	stdIo()
}
