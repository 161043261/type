# ch01 套接字

## cc

### 服务器 [server.c](./server.c)

调用 socket 函数, 创建 socket 套接字

```c
#include <sys/socket.h>
// 成功时返回 serverSocket 文件描述符, 失败时返回 -1
int /* serverSocketFd */ socket(int domain, int type, int protocol);
```

调用 bind 函数, 给 socket 套接字分配 IP 地址和端口

```c
#include <sys/socket.h>
// 成功时返回 0, 失败时返回 -1
int bind(int serverSocketFd, sockaddr *addr, socklen_t addrLen);
```

调用 listen 函数, 监听客户端的连接请求

```c
#include <sys/socket.h>
// 成功时返回 0, 失败时返回 -1
int listen(int serverSocketFd, int maxConn); // maxConn: 最大连接数
```

服务器调用 accept 函数, 接受客户端的连接请求 (服务器与客户端建立连接)

```c
#include <sys/socket.h>
// 成功时返回套接字文件描述符, 失败时返回 -1
int /* socketFd */ accept(int serverSocketFd, sockaddr *clientAddr, socklen_t clientAddrLen);
```

### 客户端 [client.c](./client.c)

- 调用 socket 函数, 创建 socket 套接字, 返回 socketFd 文件描述符
- 客户端调用 connect 函数, 向服务器发送连接请求
- 服务器写数据, 客户端读数据

## go

|        | cc                                                                                                                                                                                                                                                                                     | go                                                                                                                                                                                                   |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 客户端 | 1. 调用 socket 函数, 创建 socket 套接字<br />2. 客户端调用 connect 函数, 向服务器发送连接请求<br />3. 客户端调用 read 函数, 读数据                                                                                                                                                     | 1. 客户端调用 net.Dial 函数, 向服务器发送连接请求<br />2. 客户端调用 conn.Read 方法, 读数据                                                                                                          |
| 服务器 | 1. 调用 socket 函数, 创建 socket 套接字<br />2. 调用 bind 函数, 给 socket 套接字分配 IPv4 地址和端口<br />3. 调用 listen 函数, 监听客户端的连接请求<br />4. 服务器调用 accept 函数, 接受客户端的连接请求<br />5. 服务器与客户端建立会话 Dialogue<br />6. 服务器调用 write 函数, 写数据 | 1. 服务器调用 net.Listen 函数, 监听客户端的连接请求<br />2. 服务器调用 listener.Accept 方法, 接受客户端的连接请求<br />3. 服务器与客户端建立会话 Dialogue<br />4. 服务器调用 conn.Write 方法, 写数据 |

## Linux 文件操作

### 1 文件描述符

| 文件描述符 | 说明            |
| ---------- | --------------- |
| 0          | 标准输入 stdin  |
| 1          | 标准输出 stdout |
| 2          | 标准错误 stderr |

### 2 打开文件

```c
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
/**
 * @param path 文件路径
 * @param flag 打开模式
 * @return 成功时返回文件描述符, 失败时返回 -1
 */
int open(const char *path, int flag);
```

| 打开模式 | 说明           |
| -------- | -------------- |
| O_CREAT  | 必要时创建文件 |
| O_TRUNNC | 重写           |
| O_APPEND | 追加           |
| O_RDONLY | 只读           |
| O_WRONLY | 只写           |
| O_RDWR   | 可读可写       |

### 3 关闭文件

```c
#include <unistd.h>
/**
 * @param fd 文件描述符
 * @return 成功时返回 0, 失败时返回 -1
 */
int close(int fd);
```

### 3 写文件

```c
#include <unistd.h>
/**
 * @param fd 文件描述符
 * @param buf 保存写入数据的缓冲区
 * @param nBytes 最多写入的字节数
 * @return 成功时返回实际写入的字节数, 失败时返回 -1
 */
ssize_t write(int fd, connst void *buf, size_t nBytes);
```

### 4 读文件

```c
#include <unistd.h>
/**
 * @param fd 文件描述符
 * @param buf 保存读出数据的缓冲区
 * @param nBytes 最多读出的字节数
 * @return 成功时返回读出的字节数, 读出 EOF 时返回 -1, 失败时返回 0
 */
ssize_t read(int fd, void *buf, size_t nBytes);
```

## test

```shell
cd build
./ch01_server 3333
./ch01_client 127.0.0.1 3333

cd build/go
./ch01_server :3333
./ch01_client 127.0.0.1:3333
./ch01_test_fd
./ch01_test_rw
```
