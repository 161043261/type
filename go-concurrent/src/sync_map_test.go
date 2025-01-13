package src

import (
	"fmt"
	"strconv"
	"sync"
	"testing"
)

// 并发不安全的内置 map
var unsafeMap_ = make(map[string]int)

// 并发安全的 sync.Map
var safeMap_ = sync.Map{}

func getUnsafeMap(k string) int {
	return unsafeMap_[k]
}

func setUnsafeMap(k string, v int) {
	unsafeMap_[k] = v
}

// defer func() {
//     if ret /* any */ := recover(); ret != nil {
// 	       fmt.Println("Recovered from panic", ret)
//     }
// }()

// ! fatal error: concurrent map writes
func TestUnsafeMap(t *testing.T) {
	wg := sync.WaitGroup{}
	for i := range 50 {
		wg.Add(1)
		go func() {
			defer wg.Done()
			k := strconv.Itoa(i)
			setUnsafeMap(k, i)
			fmt.Printf("k=%v, v=%v\n", k, getUnsafeMap(k))
		}()
	}
	wg.Wait()
}

func TestSafeMap(t *testing.T) {
	wg := sync.WaitGroup{}
	for i := range 50 {
		wg.Add(1)
		go func() {
			defer wg.Done()
			k := strconv.Itoa(i)
			safeMap_.Store(k, i)
			v, _ /* ok */ := safeMap_.Load(k)
			fmt.Printf("k=%v, v=%v\n", k, v)
		}()
	}
	wg.Wait()
}
