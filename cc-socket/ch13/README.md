# ch13 IO 函数

## send 函数

```c
#include <sys/socket.h>
/**
 * @param socketFd 套接字文件描述符
 * @param buf 发送缓冲区
 * @param maxBytes 最多发送的字节数
 * @param flags 选项
 * @return 成功时返回发送字节数, 失败时返回 -1
 */
ssize_t send(int socketFd, const void *buf, size_t maxBytes, int flags);
```

## recv 函数

```c
#include <sys/socket.h>
/**
 * @param socketFd 套接字文件描述符
 * @param buf 接收缓冲区
 * @param maxBytes 最多接收的字节数
 * @param flags 选项
 * @return 成功时返回接收的字节数, 收到 EOF 时返回 0, 失败时返回 -1
 */
ssize_t recv(int socketFd, void *buf, size_t maxBytes, int flags);
```

| flags         | 说明                                     |
| ------------- | ---------------------------------------- |
| MSG_OOB       | 接收带外数据 (紧急字节) Out-of-Band Data |
| MSG_PEEK      | 从缓冲区中只读数据, 不删除数据           |
| MSG_DONTROUTE | 不使用路由表                             |
| MSG_DONTWAIT  | 使用非阻塞 IO (Non-blocking IO)          |
| MSG_WAITALL   | 接收 maxBytes 最大字节数时, 函数才返回   |

MSG_PEEK 和 MSG_DONTWAIT 配合使用

[peek_server](./peek_server.c) [peek_client](./peek_client.c)

## writev 和 readv 函数

- writev 函数合并发送多个缓冲区中的数据
- readv 函数合并接收多个缓冲区中的数据
- writev 和 readv 函数可以减少 IO 次数

结构体 iovec

```c
struct iovec {
    void *iov_base; // 缓冲区地址
    size_t iov_len; // 缓冲区大小
}
```

```c
#include <sys/uio.h>
/**
 * @param socketFd 套接字文件描述符
 * @param iovecArr 结构体 iovec 数组, 即缓冲区数组
 * @param iovecLen iovecArr 长度, 即缓冲区数量
 * @return 成功时返回发送的字节数, 失败时返回 -1
 */
ssize_t /* writeBytes */ writev(int socketFd, const struct iovec *iovecArr, int iovecLen);
```

```c
#include <sys/uio.h>

/**
 * @param socketFd 套接字文件描述符
 * @param iovecArr 结构体 iovec 数组, 即缓冲区数组
 * @param iovecLen iovecArr 长度, 即缓冲区数量
 * @return 成功时返回接收的字节数, 失败时返回 -1
 */
ssize_t /* readBytes */ readv(int socketFd, const struct iovec *iovecArr, int iovecLen);
```

[test_writev](./test_writev.c) [test_readv](./test_readv.c)

## test

```shell
cd build
./ch13_oob_server 3333
./ch13_oob_client 127.0.0.1 3333
./ch13_peek_server 3333
./ch13_peek_client 127.0.0.1 3333

./ch13_test_writev
# abcdefg123
# Write bytes: 10
./ch13_test_readv
# 123abcdefg
# Read bytes: 11
# 1st message: 123
# 2nd message: abcdefg
```

## go

go 统一使用 `conn.Write()` 和 `conn.Read()` 方法
