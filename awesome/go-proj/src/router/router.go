package router

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"os/signal"
	"syscall"
	"time"

	"bronya.com/go-proj/src/api"
	_ "bronya.com/go-proj/src/docs"
	"bronya.com/go-proj/src/global"
	"bronya.com/go-proj/src/middleware"
	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

var publicRouteGroup, authorizedRouteGroup *gin.RouterGroup

// StartRouter 创建路由组 (根路由组; 子路由组) , 启动路由器
func StartRouter() {

	//! 创建一个接收 os 信号的上下文 notifyCtx
	//! 收到任一 os 信号时, notifyCtx 的 Done 通道关闭, 可执行 <-notifyCtx.Done()
	notifyCtx, notifyCancel := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer notifyCancel()

	//! 创建 gin 默认引擎
	engine := gin.Default()

	//! 创建根路由组
	publicRouteGroup = engine.Group("/api/v1/public")
	authorizedRouteGroup = engine.Group("/api/v1")
	//! 使用 token 鉴权中间件
	authorizedRouteGroup.Use(middleware.Authorize())

	//! 创建子路组
	UserRouteGroup() // 创建 user 子路由组

	//! 使用 tag 验证器
	api.UseTagValidator()

	//! 使用 gin 跨域中间件
	engine.Use(middleware.Cors())

	//* 访问 api 文档 http://127.0.0.1:3333/swagger/index.html
	engine.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	port := viper.GetString("server.port") // 3333
	if port == "" {
		port = "8080"
	}

	server := &http.Server{
		Addr:    fmt.Sprintf(":%s", port),
		Handler: engine,
	}

	//! 在新协程中启动服务器, 主协程不会阻塞, 继续运行
	go func() {
		global.Logger.Infof("Serving on http://127.0.0.1:%s", port)
		//! 不建议使用 err != http.ErrServerClosed
		if err := server.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			global.Logger.Errorf("Serve error %s", err.Error())
			return
		}
	}()

	<-notifyCtx.Done()

	//! 在新协程中启动服务器, 主协程不会阻塞, 继续运行
	//// go func() {
	////     cmd.Start()
	//// }()

	//// quitChan := make(chan os.Signal, 1)
	//? kill    发送 syscall.SIGTERM 信号
	//? kill -2 发送 syscall.SIGINT (os.Interrupt) 信号
	//? kill -9 发送 syscall.SIGKILL 信号, 但不能被捕获

	//! 将指定的 os 信号转发到 quitChan 通道
	//// signal.Notify(quitChan, syscall.SIGINT /* os.Interrupt */, syscall.SIGTERM)
	//// <-quitChan

	//! 创建一个有超时时间的上下文 timeoutCtx
	//! 超时时间到时, 自动调用 timeoutCancel 函数关闭 timoutCtx.Done() 空通道
	//! 从一个未关闭的空通道中读, 阻塞
	//! 从一个已关闭的空通道中读, 返回通道元素类型的零值和 false, 表示读失败
	timoutCtx, timeoutCancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer timeoutCancel()

	if err := server.Shutdown(timoutCtx); /* server.Shutdown(timeoutCtx) 会执行 <-timoutCtx.Done() */
	err != nil {
		global.Logger.Errorf("Shutdown error %s", err.Error())
	}
	// <-timoutCtx.Done()
	global.Logger.Infoln("Shutdown ok")
}
