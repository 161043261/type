package main

import (
	"fmt"
	"sync"
	"time"
)

var msgChan chan string = make(chan string, 3 /* cap */)

func main() {
	//! 主协程创建 WaitGroup 实例 wg
	var wg sync.WaitGroup
	//! 主协程调用 wg.Add(n) 方法, n 是协程组中, 等待的协程数量
	wg.Add(1)
	go goroutineFunc(5, &wg)
	//! 主协程调用 wg.Wait() 方法, 等待协程组中的每个协程运行结束
	wg.Wait()
	fmt.Printf("Sub goroutine returns: %v\n", <-msgChan)
	fmt.Println("Main goroutine returns")
}

func goroutineFunc(arg int, wg *sync.WaitGroup) {
	//! 协程组的每个协程函数中 `defer wg.Done()`
	defer wg.Done()
	for i := 1; i <= arg; i++ {
		time.Sleep(1 * time.Second)
		fmt.Printf("Sub goroutine counter: %v\n", i)
	}
	msgChan <- "Ganyu!"
}
