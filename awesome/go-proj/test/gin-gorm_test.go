package test

import (
	"context"
	"fmt"
	"log"
	"testing"
	"time"

	"bronya.com/go-proj/src/conf"
	"bronya.com/go-proj/src/util"
	"github.com/spf13/viper"
)

// ! 从一个已关闭的空通道中读, 返回通道元素类型的零值和 false (表示读失败)
// ! go test -run TestNotify
func TestNotify(t *testing.T) {
	ch := make(chan int) // make(chan struct{})
	go func() {
		time.Sleep(5 * time.Second)
		close(ch)
	}()
	fmt.Println(<-ch) // 0
}

// ! go test -run TestRedisCli
func TestRedisCli(t *testing.T) {
	log.Println("==================== Read in ../settings.yml ====================")
	viper.AddConfigPath("../")
	viper.SetConfigName("settings")
	viper.SetConfigType("yaml")
	err := viper.ReadInConfig()
	if err != nil {
		log.Fatalf("Read in ../settings.yml error %s", err.Error())
	}

	log.Println("==================== Connect to redis server ====================")
	redisCli, err := conf.ConnRedis() // ! 连接 redis
	if err != nil {
		log.Fatalf("Connect to redis server error %s\n", err.Error())
	}

	log.Println("==================== Set username ====================")
	expire := viper.GetDuration("redis.expire") * time.Second
	err = redisCli.Set(context.Background(), "username", "root", expire).Err()
	if err != nil {
		log.Fatalf("Sset username error %s\n", err.Error())
	}

	log.Println("==================== Get username ====================")
	username, err := redisCli.Get(context.Background(), "username").Result()
	if err != nil {
		log.Fatalf("Get username error %s\n", err.Error())
	}
	log.Printf("username = %s\n", username)

	log.Println("==================== TTL usrname ====================")
	ttl, err := redisCli.TTL(context.Background(), "username").Result()
	if err != nil {
		log.Fatalf("TTL usrname error %s\n", err.Error())
	}
	log.Printf("ttl = %v\n", ttl)
	// ! err := redisCli.Del(context.Background(), key1, key2, ...).Err()
}

// ! go test -run TestToken
func TestToken(t *testing.T) {
	viper.AddConfigPath("../")
	viper.SetConfigName("settings")
	viper.SetConfigType("yaml")
	err := viper.ReadInConfig()
	if err != nil {
		panic(fmt.Sprintf("Read in config error %s", err.Error()))
	}
	log.Println("==================== Generate token ====================")
	tokStr, err := util.GenToken(1, "root")
	if err != nil {
		panic(fmt.Sprintf("Generate token error %s", err.Error()))
	}
	log.Printf("token = %s\n", tokStr)
	log.Println("==================== Parse token ====================")
	payload, err := util.ParseToken(tokStr) // tokStr + "suffix"
	if err != nil {
		panic(fmt.Sprintf("Parse token error %s\n", err.Error()))
	}
	log.Printf("payload = %v\n", payload)
}
