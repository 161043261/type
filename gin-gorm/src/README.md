# src

signal.Notify 函数：将 os 信号转发 (relay) 到一个通道

```go
package signal

// @param done    - 接收 os 信号的通道
// @param signals - 指定转发的 os 信号，signals 为空时转发所有 os 信号
// 例 ctrl+c 时，转发 syscall.SIGINT (os.Interrupt) 信号
func Notify(don chan<- os.Signal, signals ...os.Signal)
```

context.Background 函数：创建一个空的、不可取消的根上下文 rootContext

```go
var rootCtx context.Context = context.Background()
```

signal.NotifyContext 函数：创建一个接收 os 信号的上下文 notifyCtx

收到任一 os 信号，或主动调用 cancelFunc 函数取消 notifyCtx 时，notifyCtx 的 Done 通道关闭，可执行 <-notifyCtx.Done()

```go
package signal

// @param parentCtx  - 父上下文，通常是 context.Background() 根上下文
// @param signals    - 指定接收的 os 信号，signals 为空时接收所有 os 信号
// @param notifyCtx  - 接收 os 信号的上下文，可取消
// @param cancelFunc - 调用 cancelFunc 函数取消 notifyCtx，即停止接收 os 信号，关闭 notifyCtx 的 Done 通道，释放资源
func NotifyContext(parentCtx context.Context, signals ...os.Signal) (notifyCtx context.Context, cancelFunc context.CancelFunc)
```

context.WithTimeout 函数：创建一个有超时时间的上下文 timeoutCtx

超时时间到，或主动调用 cancelFunc 函数取消 timeoutCtx 时，timeoutCtx 的 Done 通道关闭，可执行 <-timeoutCtx.Done()

```go
package context

// @param parentCtx  - 父上下文，通常是 context.Background() 根上下文
// @param timeout    - 超时时间
// @param timeoutCtx - 有超时时间的上下文，可取消
// @param cancelFunc - 调用 cancelFunc 函数取消 timeoutCtx，即停止超时计时器，关闭 timeoutCtx 的 Done 通道，释放资源
func WithTimeout(parentCtx Context, timeout time.Duration) (timeoutCtx Context, cancelFunc CancelFunc)
```
