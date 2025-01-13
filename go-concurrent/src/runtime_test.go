package src

import (
	"fmt"
	"runtime"
	"testing"
)

func TestGosched(t *testing.T) {
	go func(s string) {
		for i := 0; i < 2; i++ {
			fmt.Println(s)
		}
	}("World")

	for i := 0; i < 2; i++ {
		//! 当前协程放弃处理机 (类似 yield) 允许其他协程运行
		//! Goshed 函数不会z当前协程, 当前协程会自动恢复运行
		runtime.Gosched()
		fmt.Println("Hello")
	}
}

func TestGoexit(t *testing.T) {
	go func() {
		defer fmt.Println("A defer")
		func() {
			defer fmt.Println("B defer")
			// 结束当前协程
			runtime.Goexit()
			fmt.Println("B")
		}()
		fmt.Println("A")
	}()
	// select {}
}

//! 运行结果
// B defer
// A defer

//! runtime.GOMAXPROCS(n /* threads */)
// 调用 runtime.GOMAXPROCS(n /* threads */) 使用 n 个 os 线程运行 go 代码
// n 的默认值是 cpu 核心数
