package src

import (
	"fmt"
	"testing"
)

func recv(emptyChan chan string) {
	ret := <-emptyChan
	fmt.Println("Recv", ret) // Recv ok
}

func TestUnbufferedChan(t *testing.T) {
	// 无缓冲的通道
	unbufferedChan := make(chan string)
	//! 解决: 启动一个协程, 从无缓冲的通道 emptyChan 中接收数据
	go recv(unbufferedChan)
	// 向无缓冲的通道 emptyChan 中发送数据, 会阻塞
	unbufferedChan <- "ok"
	fmt.Println("Send ok")
}

func TestPopFromUnbufferedChan(t *testing.T) {
	ch1 := make(chan int)
	ch2 := make(chan int)
	// 启动一个协程, 向无缓冲的通道 ch1 中发送数据
	go func() {
		for i := 0; i < 10; i++ {
			ch1 <- i
		}
		close(ch1)
	}()
	// 开启一个协程, 从无缓冲的通道 ch1 中接收数据
	go func() {
		for {
			i, ok := <-ch1 // 方式 1 通过 ok? 判断通道是否关闭
			if !ok {
				break
			}
			// 向无缓冲的通道 ch2 中发送数据
			ch2 <- i * i
		}
		close(ch2)
	}()

	for i := range ch2 { // 通道关闭后, 退出 for range 循环
		fmt.Print(i, " ")
	}
}

// ! 只能向 ch1 发送数据
func push(ch1 chan<- int) {
	for i := 0; i < 10; i++ {
		ch1 <- i
	}
	close(ch1)
}

// ! 只能从 ch1 接收数据, 只能向 ch2 发送数据
func forward(ch1 <-chan int, ch2 chan<- int) {
	for {
		i, ok := <-ch1
		if !ok {
			break
		}
		ch2 <- i * i
	}
	close(ch2)
	//! 如果 ch2 未关闭
	//! 主协程 (pop 函数) 从没有新数据的空通道 ch2 中读数据, 会导致阻塞/死锁
}

// 只能从 ch2 接收数据
func pop(ch2 <-chan int) {
	for i := range ch2 {
		fmt.Print(i, " ")
	}
}

func TestOnewayChan(t *testing.T) {
	ch1 := make(chan int)
	ch2 := make(chan int)
	go push(ch1)
	go forward(ch1, ch2)
	pop(ch2)
}
