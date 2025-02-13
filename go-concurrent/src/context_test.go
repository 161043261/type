package src

import (
	"context"
	"testing"
	"time"
)

// context 包中的 Context 上下文接口源码
type __Context__ interface {
	// 返回 Context 上下文实例的工作 work 的截止时间 deadline
	Deadline() (deadline time.Time, ok bool)
	// 返回一个单例 channel
	// Context 上下文实例的工作完成, 或工作被取消时, 该 channel 将关闭
	Done() <-chan struct{}
	// Done 方法返回的 channel 关闭时, 返回 Context 结束的原因
	// // 如果工作被取消, 则返回 Canceled 错误
	// // 如果超时, 则返回 DeadlineExceeded 错误
	// Done 方法返回的 channel 未关闭时, 返回 nil
	Err() error
	// 从 Context 实例中通过键获取值
	Value(key interface{}) interface{}
}

func TestContextWithTimeout(t *testing.T) {
	context.WithTimeout(context.Background(), 3*time.Second)

}
