package src

import (
	"encoding/json"
	"fmt"
	"os"
	"sync"
	"testing"
)

//! package sync
//! func (o *Once) Do(f func())
//! 适合高并发下, 函数 f 只执行 1 次的场景

var jsonStr_ string // 单行; 无空格的 json 字符串

// 例: 加载 json 文件
func loadJson(jsonPath string) {
	if jsonStr_ != "" {
		return
	}
	fmt.Println("Loading ", jsonPath)
	bytes, _ /* err */ := os.ReadFile(jsonPath)
	var jsonMap map[string]interface{}
	_ /* err */ = json.Unmarshal(bytes, &jsonMap)
	jsonBytes, _ /* err */ := json.Marshal(jsonMap)
	jsonStr_ = string(jsonBytes) // 单行; 无空格的 json 字符串
}

// 高并发下, loadJson 函数只执行 1 次
func TestOnce(t *testing.T) {
	var once sync.Once
	jsonPath := "../tsconfig.json"
	// 闭包
	once.Do(func(path string) func() {
		return func() {
			loadJson(path)
		}
	}(jsonPath))
	fmt.Println(jsonStr_)
}

// 高并发下, loadJson 函数可能执行多次
func TestMultiple(t *testing.T) {
	var wg sync.WaitGroup
	jsonPath := "../tsconfig.json"
	for range 50000 {
		wg.Add(1)
		go func() {
			defer wg.Done()
			loadJson(jsonPath)
		}()
	}
	wg.Wait()
	fmt.Println(jsonStr_)
}
