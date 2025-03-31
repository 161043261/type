package main

import (
	"bronya.com/gin-gorm/src/cmd"
)

// @title gin-gorm
// @version 0.0.1
// @description 后端 viper, zap, gin, gorm, go-redis, jwt, cors
func main() {
	defer cmd.Done()
	cmd.Start()
}
