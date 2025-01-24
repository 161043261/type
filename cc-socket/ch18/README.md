# ch18

## cc 多线程服务器

- 进程是资源分配单位
- 线程是 cpu 调度单位

### cc 线程

#### pthread_create 创建子进程

```c
#include <pthread.h>

using ThreadFunc = void *(void *);
using any = void *;
/**
 * @param threadId 接收线程 id
 * @param attr 线程属性, 传递 NULL 时使用默认线程属性
 * @param threadFunc 函数指针
 * @param arg 函数参数
 * @return 成功时返回 0, 失败时返回 -1
 */
int pthread_create(pthread_t *threadId, const pthread_attr_t *attr, ThreadFunc *threadFunc, any arg);
```

#### pthread_join 和 pthread_detach

- 调用 pthread_join 函数, 子线程加入主线程, 主进程会等待子线程终止
- 调用 pthread_detach 函数, 从主进程上分离子进程, 主进程不会等待子线程
- 子进程 detach 分离主线程后, 不能再 join 加入主进程

```c
#include <pthread.h>
using any = void *;
/**
 * @param threadId 线程 id
 * @param retPtr void * 类型的指针, 接收线程返回值, 传递 NULL 时不接收线程返回值
 * @return 成功时返回 0, 失败时返回 -1
 */
int pthread_join(pthread_t threadId, any *retPtr); // 主进程会等待子线程终止
// 成功时返回 0
int pthread_detach(pthread_t threadId); // 主进程不会等待子线程
```

[pthread1](./pthread1.c)

### 工作线程 Worker

场景: 创建两个线程, 线程 A 计算 1 到 5 的和, 线程 B 计算 6 到 10 的和, 主线程等待两个线程终止

[pthread2](./pthread2.c) 线程不安全！

### 线程同步

共享: 同时共享; 互斥共享
临界区 (Critical Section) 访问互斥共享资源的代码块

线程同步问题

1. 生产者 - 消费者
   - 缓冲区未满时, 生产者进程可以写数据
   - 缓冲区不空时, 消费者进程可以读数据
2. 读者 - 写者
   - 允许多个进程同时读
   - 允许一个进程互斥写
   - 不允许同时读写

[pthread3](./pthread3.c) 线程不安全！

### 互斥锁 mutex

互斥锁的创建; 临界区加锁; 临界区解锁; 销毁

```c
#include <pthread.h>
/**
 * @param mut 接收创建的互斥锁
 * @param attr 互斥锁属性, 传递 NULL 时使用默认互斥锁属性
 * @return 成功时返回 0
 */
int pthread_mutex_init(pthread_mutex_t *mut, const pthread_mutexattr_t *attr); // 创建互斥锁

// 成功时返回 0
int pthread_mutex_lock(pthread_mutex_t *mut);    // 临界区加锁
// 成功时返回 0
int pthread_mutex_lock(pthread_mutex_t *mut);    // 临界区解锁
// 成功时返回 0
int pthread_mutex_destroy(pthread_mutex_t *mut); // 销毁互斥锁
```

[pthread4](./pthread4.c)

### 多线程服务器和客户端

[thread_server](./thread_server.c) [thread_client](./thread_client.c)

## go 多协程服务器

### go 协程

有栈协程 goroutine: 轻量级用户态线程

1. 主协程创建 WaitGroup 实例 wg
2. 主协程调用 wg.Add(n) 方法, n 是协程组中, 等待的协程数量
3. 协程组的每个协程函数中 `defer wg.Done()`
4. 主协程调用 wg.Wait() 方法, 等待协程组中的每个协程运行结束

### 工作协程 Worker

[goroutine2](./go/goroutine2/goroutine2.go) 线程不安全！

### 协程同步

[goroutine3](./go/goroutine3/goroutine3.go) 线程不安全！

### 互斥锁 mutex

```go
var mut sync.Mutex
mut.Lock()   // 加锁
mut.Unlock() // 解锁
```

[goroutine4](./go/goroutine4/goroutine4.go)

### 多协程服务器和客户端

[goroutine_server](./go/goroutine_server/goroutine_server.go)
[goroutine_client](./go/goroutine_client/goroutine_client.go)

## test

```shell
cd build
./ch18_pthread1
./ch18_pthread2
./ch18_pthread3
./ch18_pthread4
./ch18_pthread_server 3333
./ch18_pthread_client 127.0.0.1 3333

cd build/go
./ch18_goroutine1
./ch18_goroutine2
./ch18_goroutine3
./ch18_goroutine4
./ch18_goroutine_server :3333
./ch18_goroutine_client 127.0.0.1:3333
```
