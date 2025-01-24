package src

import (
	"fmt"
	"sync"
	"testing"
)

//! sync.WaitGroup
//! func (wg *WaitGroup) Add(delta int) | 计数器 + delta
//! func (wg *WaitGroup) Done()         | 计数器 - 1
//! func (wg *WaitGroup) Wait()         | 等待计数器 = 0

var sharedInt_ = 0

func task(wg *sync.WaitGroup) {
	wg.Add(1) // 加入 wg 等待组
	defer wg.Done()
	fmt.Println("I'm sub goroutine") // 不会执行
}

func TestWaitGroup1(t *testing.T) {
	var wg sync.WaitGroup
	go task(&wg)
	fmt.Println("I'm main goroutine")
	//! 解决 1 - 主协程睡眠 1 s, 等待子协程执行结束
	// time.Sleep(time.Second)
	//! 解决 2 - 使用 WaitGroup (类似 join)
	wg.Wait() // 等待加入 wg 等待组的子协程执行结束
}

func add1(wg *sync.WaitGroup, sharedInt *int) {
	defer wg.Done()
	for range 50000 {
		*sharedInt += 1
	}
}

func sub1(wg *sync.WaitGroup, sharedInt *int) {
	defer wg.Done()
	for range 50000 {
		*sharedInt -= 1
	}
}

func TestWaitGroup2(t *testing.T) {
	var wg sync.WaitGroup
	wg.Add(2)
	sharedInt := 0
	go add1(&wg, &sharedInt)
	go sub1(&wg, &sharedInt)
	wg.Wait()
	fmt.Println(sharedInt) // 有并发安全问题 sharedInt_ != 0
}

func add2(wg *sync.WaitGroup) {
	defer wg.Done()
	for range 50000 {
		sharedInt_++
	}
}

func sub2(wg *sync.WaitGroup) {
	defer wg.Done()
	for range 50000 {
		sharedInt_--
	}
}

func TestWaitGroup3(t *testing.T) {
	var wg sync.WaitGroup
	wg.Add(2)
	go add2(&wg)
	go sub2(&wg)
	wg.Wait()
	fmt.Println(sharedInt_) // 有并发安全问题 sharedInt_ != 0
}
