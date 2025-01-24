package gtest

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"
	"testing"
	"time"
)

// ! go test -v -run TestEmptyChan
func TestEmptyChan(t *testing.T) {
	emptyChan := make(chan struct{})
	go func() {
		time.Sleep(1 * time.Second)
		close(emptyChan)
	}()
	select {
	// ! 从一个未关闭的空通道中读, 阻塞
	// ! 从一个已关闭的空通道中读, 返回通道元素类型的零值和 false, 表示读失败
	case <-emptyChan:
		{
			log.Println("emptyChan is closed")
		}
	case <-time.After(3 * time.Second):
		{
			log.Println("Timeout")
		}
	}
}

// ! go test -v -run TestTimeoutCtx
func TestTimeoutCtx(t *testing.T) {
	// ! 创建一个有超时时间的上下文 ctx
	// ! 超时时间到时, 自动调用 cancel 函数关闭 ctx.Done() 空通道
	// ! 从一个未关闭的空通道中读, 阻塞
	// ! 从一个已关闭的空通道中读, 返回通道元素类型的零值和 false, 表示读失败
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	go func() {
		time.Sleep(1 * time.Second)
		log.Println("close(ctx.Done())")
		cancel() // 子协程睡眠 1s 后, 调用 cancel 函数主动关闭 ctx.Done() 空通道
	}()
	<-ctx.Done()
	log.Println("Timeout")
}

// ! go test -run TestSignalChan
func TestSignalChan(t *testing.T) {
	signalChan := make(chan os.Signal, 1)
	// kill    发送 syscall.SIGTERM 信号
	// kill -2 发送 syscall.SIGINT (os.Interrupt) 信号
	// kill -9 发送 syscall.SIGKILL 信号, 但不能被捕获

	// ! 将指定的 os 信号转发到 signalChan 通道
	signal.Notify(signalChan, syscall.SIGINT /* os.Interrupt */, syscall.SIGTERM)
	<-signalChan
	log.Println("Graceful exit")
}

func TestNotifyCtx(t *testing.T) {
	// ! 创建一个接收 os 信号的上下文 ctx, 收到 os 信号时, ctx.Done() 空通道关闭
	ctx, cancel := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer cancel()
	// ! 收到 os 信号时, ctx.Done() 空通道关闭
	<-ctx.Done()
	log.Println("Graceful exit")
}
