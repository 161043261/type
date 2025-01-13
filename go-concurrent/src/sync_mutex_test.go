package src

import (
	"fmt"
	"sync"
	"testing"
	"time"
)

func add(x *int, mut *sync.Mutex, wg *sync.WaitGroup) {
	wg.Add(1)
	defer wg.Done()
	for i := 0; i < 5000; i++ {
		mut.Lock()
		*x += 1
		mut.Unlock()
	}
}

func sub(x *int, mut *sync.Mutex, wg *sync.WaitGroup) {
	wg.Add(1)
	defer wg.Done()
	for i := 0; i < 5000; i++ {
		mut.Lock()
		*x -= 1
		mut.Unlock()
	}
}

// 互斥锁
// go gopher -v -run TestMutex
func TestMutex(t *testing.T) {
	var wg sync.WaitGroup
	var x int
	var mut sync.Mutex
	go add(&x, &mut, &wg)
	go sub(&x, &mut, &wg)
	wg.Wait()
	fmt.Println(x) // 没有并发安全问题 sharedInt_ == 0
}

// ! 读写锁: 用于读多写少的场景
// 1. 一个协程获取读锁 RLock 时
// 其他协程可以获取读锁, 不能获取写锁 (共享读)
// 2. 一个协程获取写锁 Lock 时
// 其他协程不能获取写锁和读锁 (独占写)
func write(wg *sync.WaitGroup, rwMut *sync.RWMutex, sharedInt *int) {
	defer wg.Done()
	rwMut.Lock() // 加写锁
	*sharedInt += 1
	rwMut.Unlock() // 解写锁
}

func read(wg *sync.WaitGroup, rwMut *sync.RWMutex, sharedInt *int) {
	defer wg.Done()
	rwMut.RLock() // 加读锁
	fmt.Println("Read sharedInt =", *sharedInt)
	rwMut.RUnlock() // 解读锁
}

// go gopher -run TestRWMutex
func TestRWMutex(t *testing.T) {
	start := time.Now()
	wg := new(sync.WaitGroup)
	rwMut := new(sync.RWMutex)
	sharedInt := 0
	for i := 0; i < 3; i++ {
		wg.Add(1)
		go write(wg, rwMut, &sharedInt) // 启动 3 个写协程, 写少
	}
	for i := 0; i < 100; i++ {
		wg.Add(1)
		go read(wg, rwMut, &sharedInt) // 启动 100 个读协程, 读多
	}
	wg.Wait()
	end := time.Now()
	fmt.Println("Time:", end.Sub(start))
}
