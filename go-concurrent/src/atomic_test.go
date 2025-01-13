package src

import (
	"fmt"
	"sync"
	"sync/atomic"
	"testing"
	"time"
)

// 使用原子操作 x++
func atomicAdd(x *int32, wg *sync.WaitGroup) {
	defer wg.Done()
	atomic.AddInt32(x, 1)
}

// 使用互斥锁 x++
func mutexAdd(mut *sync.Mutex, x *int32, wg *sync.WaitGroup) {
	defer wg.Done()
	mut.Lock()
	*x += 1
	mut.Unlock()
}

func TestAtomicAdd(t *testing.T) {
	start := time.Now()
	var x int32
	var wg sync.WaitGroup
	for range 50000 {
		wg.Add(1)
		go atomicAdd(&x, &wg)
	}
	wg.Wait()
	end := time.Now()
	fmt.Println("Test atomic add", end.Sub(start))
}

func TestMutexAdd(t *testing.T) {
	start := time.Now()
	var mut sync.Mutex
	var x int32
	var wg sync.WaitGroup
	for range 50000 {
		wg.Add(1)
		go mutexAdd(&mut, &x, &wg)
	}
	wg.Wait()
	end := time.Now()
	fmt.Println("Test mutex add", end.Sub(start))
}
