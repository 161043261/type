package src

import (
	"fmt"
	"testing"
	"time"
)

// select 多路复用
func send1(ch chan string) {
	time.Sleep(5 * time.Second)
	ch <- "Send after 5s"
}

func send2(ch chan string) {
	time.Sleep(3 * time.Second)
	ch <- "Send after 3s"
}

// 选择
func TestSelect1(t *testing.T) {
	ch1 := make(chan string)
	ch2 := make(chan string)
	go send1(ch1)
	go send2(ch2)
	select {
	case msg := <-ch1:
		fmt.Println(msg)
	case msg := <-ch2:
		fmt.Println(msg)
	}
}

// 如果多个通道同时就绪, 则随机选择一个
func TestSelect2(t *testing.T) {
	ch1 := make(chan int, 1)
	ch2 := make(chan string, 1)
	ch1 <- 8
	ch2 <- "x"
	select {
	case v := <-ch1:
		fmt.Println(v)
	case v := <-ch2:
		fmt.Println(v)
	}
}

// 使用 select 判断通道满
func TestSelect3(t *testing.T) {
	ch := make(chan int, 3)

	go func() {
		i := 0
		for {
			select {
			case ch <- i:
				fmt.Printf("Write %v to channel\n", i)
				i++
			default: // 通道满时, 执行 default
				fmt.Println("Channel is full, close channel")
				close(ch) // 关闭通道, 预防死锁
				return
			}
		}
	}()

	for s := range ch {
		fmt.Printf("Read %v from channel\n", s)
		time.Sleep(time.Second)
	}
}
