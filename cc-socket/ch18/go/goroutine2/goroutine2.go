package main

import (
	"fmt"
	"sync"
)

var sum = 0

func main() {
	//! 主协程创建 WaitGroup 实例 wg
	var wg sync.WaitGroup
	//! 主协程调用 wg.Add(n) 方法, n 是协程组中, 等待的协程数量
	wg.Add(2)
	fromToA := []int{1, 5}
	fromToB := []int{6, 10}
	go goroutineFunc(fromToA, &wg)
	go goroutineFunc(fromToB, &wg)
	//! 主协程调用 wg.Wait() 方法, 等待协程组中的每个协程运行结束
	wg.Wait()
	fmt.Printf("sum = %d\n", sum)
}

func goroutineFunc(fromTo []int, wg *sync.WaitGroup) {
	//! 协程组的每个协程函数中 `defer wg.Done()`
	defer wg.Done()
	from := fromTo[0]
	to := fromTo[1]
	for i := from; i <= to; i++ {
		sum += i
	}
}
