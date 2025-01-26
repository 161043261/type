# ch17 epoll

等待是主动的行为, 阻塞是被动的行为

- epoll_create 创建 epoll 实例
- epoll_ctl 添加; 修改和删除被监听的文件描述符
- epoll_wait 等待事件发生或超时

## cc

### epoll_create

> epoll_create 函数: 创建 epoll 实例

```c
#include <sys/epoll.h>
/**
 * @param size epoll 实例的大小
 * @return 成功时返回文件描述符, 失败时返回 -1
 */
int epoll_create(int size);
```

### epoll_ctl

> epoll_ctl 函数: 添加; 修改和删除被监听的文件描述符

| option        | 说明                             |
| ------------- | -------------------------------- |
| EPOLL_CTL_ADD | 添加一个被监听的文件描述符       |
| EPOLL_CTL_MOD | 修改被监听的文件描述符的事件类型 |
| EPOLL_CTL_DEL | 删除一个被监听的文件描述符       |

| epollEvent->events | 说明                     |
| ------------------ | ------------------------ |
| EPOLLIN            | 文件描述符可读           |
| EPOLLOUT           | 文件描述符可写           |
| EPOLLPRI           | 收到 OOB 数据 (带外数据) |
| EPOLLRDHUP         | 连接 关闭/半关闭 时      |
| EPOLLERR           | 发生错误时               |
| EPOLLET            | 设置边沿触发             |
| EPOLLONESHOT       | 设置一次性触发           |

```c
#include <sys/epoll.h>

struct epoll_event {
    __uint32_t events;
    epoll_data_t data;
}

/**
 * @param epollInstanceFd epoll 实例的文件描述符
 * @param option 添加; 修改和删除被监听的文件描述符
 * @param monitoredFd 被监听的文件描述符
 * @param epollEvent 监听事件
 * @return 成功时返回 0, 失败时返回 -1
 */
int epoll_ctl(int epollInstanceFd, int option, int monitoredFd, struct epoll_event *epollEvent);

epoll_ctl(fdA, EPOLL_CTL_ADD, fdB, &event); // 向 epoll 实例 A 中添加 fdB, 监听 event 事件
epoll_ctl(fdA, EPOLL_CTL_DEL, fdB, NULL);   // 从 epoll 实例 A 中删除 fdB
```

### epoll_wait

> epoll_wait 函数: 等待事件发生或超时

```c
#include <sys/epoll.h>
/**
 * @param epollInstanceFd epoll 实例的文件描述符
 * @param eventArr 监听事件数组
 * @param eventCnt 监听事件数组的大小
 * @param timeout 超时/ms -1 表示不会超时
 * @return 成功时返回发生事件的数量, 失败时返回 -1
 */
int epoll_wait(int epollInstanceFd, struct epoll_event *eventArr, int eventCnt, int timeout)
```

## epoll vs. select

设置文件描述符

| 文件描述符 | 值  | 说明            |
| ---------- | --- | --------------- |
| fd0        | 0   | 标准输入 stdin  |
| fd1        | 1   | 标准输出 stdout |
| fd2        | 2   | 标准错误 stderr |

```c
fd_set fdSet; // 0 不监听, 1 监听

FD_ZERO(fd_set *fdSet); // fdSet 置 0, 不监听所有的文件描述符
FD_ZERO(&fdSet);
//   fd0   fd1   fd2
// *-----*-----*-----*----
// |  0  |  0  |  0  | ...
// *-----*-----*-----*----

FD_SET(int fdx, &fdSet); // fdx 置 1, 监听 fdx
FD_SET(1, &fdSet); // 监听标准输出 stdout
//   fd0   fd1   fd2
// *-----*-----*-----*----
// |  0  |  1  |  0  | ...
// *-----*-----*-----*----

FD_CLR(int fdx, &fdSet); // fdx 置 0, 不监听 fdx
FD_CLR(2, &fdSet); // 不监听标准输出 stdout
//   fd0   fd1   fd2
// *-----*-----*-----*----
// |  0  |  0  |  0  | ...
// *-----*-----*-----*----

// select 函数的返回值 > 0, 即有 fd 可读/可写时, 返回 fdx 是否可读/可写
FD_ISSET(int fdx, fd_set* fdSet);
```

设置监听范围和超时

```c
#include <sys/select.h>
#include <sys/time.h>

/**
 * @param numFd - fd_set 的最大 fd 值 +1
 * @param readFdSet - &fd_set 监听是否可读, NULL 表示不监听
 * @param writeFdSet - &fd_set 监听是否可写, NULL 表示不监听
 * @param exceptFdSet - &fd_set 监听有无异常, NULL 表示不监听
 * @param timeout 超时
 * @return 有 fd 可读/写时, 返回 IO 就绪的 fd 数量; 有异常返回 -1; 超时返回 0
 */
int select(int numFd, fd_set *readFdSet, fd_set *writeFdSet, fd_set *exceptFdSet, const struct timeval *timeout);
```

```c
struct timeval {
    long tv_sec; // 秒
    long tv_usec; // 毫秒
}
```

### 水平触发 (默认) 和边沿触发

- 水平触发 Level Triggered, **LT** - fd 可读/可写时, epoll_wait 函数返回该事件 (持续通知该事件) 直到数据被读出或写入结束, 类似数字电路 01 电平触发
- 边沿触发 Edge Triggered, **ET** - fd 由 不可读/写 ==> 可读/写 或 由 可读/写 ==> 不可读/写 时, epoll_wait 函数返回该事件 (该事件通知一次) , 类似数字电路边沿触发

场景

- 连接的建立和关闭: 离散事件, 使用水平触发 (默认)

- 传输流式数据: 流式事件, 使用边沿触发

```c
epollEvent.events = EPOLLIN;           // 水平触发 (默认) Level Trigger, LT
epollEvent.events = EPOLLIN | EPOLLET; // 边沿触发 Edge Trigger, ET
```

## test

```shell
./ch17_epoll_server 3333
./ch04_echo_client 127.0.0.1 3333
```
