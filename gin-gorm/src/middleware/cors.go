package middleware

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// Cors gin 跨域中间件
// ! CORS, Cross-Origin Resource Sharing 跨域资源共享
func Cors() gin.HandlerFunc {
	corsConfig := cors.Config{
		AllowCredentials: true,
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"},
		AllowHeaders: []string{
			"Origin",         //! 发送 HTTP 请求的源端，即客户端的：协议、IP 地址、端口
			"Content-Length", //! 请求消息的长度
			"Content-Type",   //! 请求消息的类型
			"Authorization",  //! 客户端发送给服务器的身份验证信息，例如 jwt
			"Accept",         //! 客户端可接收的响应消息的类型
			//? 请求/响应消息的类型
			//? 文本类型     text/plain, text/css, text/html, text/javascript
			//? 应用程序类型 application/json, application/xml, application/pdf
			//? 图像类型     image/jpeg, image/png, image/gif
		},
		// AllowAllOrigins: true,
		AllowOriginFunc: func(origin string) bool {
			return true
		},
	}
	return cors.New(corsConfig)
}
