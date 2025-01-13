package src

import (
	"fmt"
	"reflect"
	"testing"
)

// go var_test -run TestVar
func TestVar(t *testing.T) {
	//! var 可以声明包级别 package 或函数级别 func 变量
	var i int              // 默认初始化为 0
	var p *int             // 默认初始化为 nil
	var s string = "hello" // 显式初始化
	fmt.Println(i, p, s)   // 0 nil jk
}

// go var_test -run TestNew
func TestNew(t *testing.T) {
	//! new 分配内存, 返回指向类型零值的指针
	ptr := new(int)
	fmt.Println(*ptr) // 0
}

// go var_test -run TestMake
func TestMake(t *testing.T) {
	//! make 用于创建切片, map 和 通道类型的变量 (集合)
	s := make([]int, 3)          // 打印 [0 0 0]
	m := make(map[string]int, 3) // 打印 map[]
	c := make(chan int, 3)       // 打印内存地址
	fmt.Println(s, m, c)
}

// go var_test -run TestArr
func TestArrayAndSlice(t *testing.T) {
	a1 := [3]int{1, 2, 3}                               // 数组
	a2 := [...][3]int{{4, 5, 6}, {7, 8, 9}}             // 数组
	s1 := []int{1, 2, 3}                                // 切片
	s2 := [][]int{{4, 5, 6}, {7, 8, 9}}                 // 切片
	fmt.Println(reflect.TypeOf(a1), reflect.TypeOf(a2)) // [3]int [2][3]int
	fmt.Println(reflect.TypeOf(s1), reflect.TypeOf(s2)) // []int [][]int
}
