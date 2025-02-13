package main

import (
	"bronya.com/go-proj/src/cmd"
)

// @title go-proj
// @version 0.0.1
// @description 后端 viper, zap, gin, gorm, go-redis, jwt, cors
func main() {
	defer cmd.Done()
	cmd.Start()
}
