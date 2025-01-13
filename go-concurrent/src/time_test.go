package src

import (
	"fmt"
	"sync"
	"testing"
	"time"
)

func TestNewTimer1(t *testing.T) {
	// 创建一个定时器, 3s 后触发
	timer := time.NewTimer(3 * time.Second)
	// bt 开始时间戳
	bt := time.Now()
	// 通过 timer.C /* make(chan Time, 1) */ 接收定时器 timer 触发时的时间戳
	// 定时器时间到时, 向通道 timer.C 中发送当前时间戳
	et := <-timer.C         // et 结束时间戳
	fmt.Println(et.Sub(bt)) // 3s
}

func TestNewTimer2(t *testing.T) {
	// 主协程从没有新数据的空通道 timer.C 中读数据, 会导致阻塞/死锁
	timer := time.NewTimer(3 * time.Second)
	for {
		<-timer.C
		fmt.Println("Timer triggered")
	}
}

func TestNewTimer3(t *testing.T) {
	time.Sleep(3 * time.Second)
	fmt.Println("3s passed...")
	timer := time.NewTimer(3 * time.Second)
	<-timer.C
	fmt.Println("3s passed...")
	<-time.After(3 * time.Second)
	fmt.Println("3s passed...")
}

func TestNewTimer4(t *testing.T) {
	timer := time.NewTimer(3 * time.Second)
	go func() {
		<-timer.C
		fmt.Println("Timer triggered")
	}()
	ok := timer.Stop()
	if ok {
		fmt.Println("Timer stopped") // Timer stopped
	}
}

func TestNewTimer5(t *testing.T) {
	timer := time.NewTimer(30 * time.Second)
	timer.Reset(3 * time.Second) // 重置定时器
	fmt.Println(time.Now().Format(time.DateTime))
	fmt.Println((<-timer.C).Format(time.DateTime))
}

func TestNewTicker(t *testing.T) {
	ticker := time.NewTicker(1 * time.Second)
	count := 0
	wg := &sync.WaitGroup{}
	wg.Add(1)
	go func() {
		defer wg.Done()
		for count < 5 {
			count++
			fmt.Println((<-ticker.C).Format(time.DateTime))
		}
		ticker.Stop()
	}()
	time.Sleep(time.Millisecond) // 睡眠 1ms 等待子协程启动
	wg.Wait()
}
