package conf

import (
	"context"
	"github.com/redis/go-redis/v9"
	"github.com/spf13/viper"
)

func ConnRedis() (redisCli *redis.Client, err error) {
	redisCli = redis.NewClient(&redis.Options{
		Addr:     viper.GetString("redis.addr"),
		Password: "",
		DB:       0,
	})
	_, err = redisCli.Ping(context.Background()).Result()
	if err != nil {
		return nil, err
	}
	return redisCli, nil
}
