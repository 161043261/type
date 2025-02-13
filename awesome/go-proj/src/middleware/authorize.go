package middleware

import (
	"bronya.com/go-proj/src/api"
	"bronya.com/go-proj/src/global"
	"bronya.com/go-proj/src/util"
	"context"
	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"
	"log"
	"strconv"
	"strings"
	"time"
)

// Authorize token 鉴权中间件
func Authorize() func(ctx *gin.Context) {
	return func(ctx *gin.Context) {
		bearerToken := ctx.GetHeader("Authorization")
		//! Authorization: Bearer <token>
		if bearerToken == "" {
			api.Err(ctx, api.Resp{Msg: "Token is empty"})
			return
		}
		if !strings.HasPrefix(bearerToken, "Bearer ") {
			api.Err(ctx, api.Resp{Msg: "Token doesn't have prefix 'Bearer '"})
			return
		}
		token := bearerToken[7:]
		payload, err := util.ParseToken(token)
		if err != nil {
			api.Err(ctx, api.Resp{Msg: err.Error()})
			return
		}
		tokenId := "token" + strconv.Itoa(int(payload.Id))
		oldToken, err := global.RedisCli.Get(context.Background(), tokenId).Result()
		if err != nil {
			api.Err(ctx, api.Resp{Msg: err.Error()})
			return
		}
		if token != oldToken {
			api.Err(ctx, api.Resp{Msg: "Token doesn't match"})
			return
		}
		//! token 是否过期
		ttl, err := global.RedisCli.TTL(context.Background(), tokenId).Result()
		if err != nil {
			api.Err(ctx, api.Resp{Msg: "Token not found"})
			return
		}
		if ttl <= 0 {
			log.Printf("ttl = %v\n", ttl)
			api.Err(ctx, api.Resp{Msg: "Token is expired"})
			return
		}
		expire := viper.GetDuration("redis.expire") * time.Second
		//! ==================== token 续期 ====================
		global.RedisCli.Expire(context.Background(), tokenId, expire)
		ctx.Header("Authorization", "Bearer "+token) //! REDUNDANT
		ctx.Next()                                   // 放行
	}
}
