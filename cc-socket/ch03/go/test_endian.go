package main

import (
	"fmt"
	"unsafe"
)

func IsLittleEndian() bool {
	var tester int32 = 1
	// 大端序 0x00_00_00_01
	// 小端序 0x01_00_00_00
	pointer := unsafe.Pointer(&tester)
	pb := (*byte)(pointer)
	return *pb == 1
}

// X86, ARM 都是小端序
func main() {
	fmt.Printf("Is little endian: %v\n", IsLittleEndian()) // true
}
