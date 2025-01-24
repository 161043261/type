# ch15 套接字和标准 IO

## cc

### fdopen 函数

调用 fdopen 函数, 将文件描述符 fd 转换为 FILE 结构体指针 fp

```c
#include <stdio.h>
/**
 * @param fd 文件描述符
 * @param mode FILE 结构体指针的模式信息
 * @return 成功时返回FILE 结构体指针, 失败时返回 NULL
 */
FILE *fdopen(int fd, const char *mode);
```

### fileno 函数

调用 fileno 函数, 将 FILE 结构体指针 fp 转换为文件描述符 fd

```c
#include <stdio.h>
/**
 * @param stream FILE 结构体指针
 * @return 成功时返回文件描述符, 失败时返回 -1
 */
int fileno(FILE *stream);
```

```text
 *--- 服务器读缓冲 <-- socket 缓冲 <-- 客户端写缓冲 <--*
 |                                                     |
 |  *--------*                            *--------* send
buf | 服务器 |                            | 客户端 |
 |  *--------*                            *--------* recv
 |                                                     |
 *--> 服务器写缓冲 --> socket 缓冲 --> 客户端读缓冲 ---*
```

## go

### os.NewFile 函数

调用 os.NewFile 函数, 将文件描述符 fd 转换为 os.File 结构体指针 fp

```go
import (
	"os"
	"syscall"
)
//! O_CREAT 如果文件不存在, 则创建文件
//! O_RDONLY 只读; O_WRONLY 只写; O_TRUNC 重写
fd_ /* int */, _ := syscall.Open("../../README.txt", os.O_WRONLY | os.O_CREATE | os.O_TRUNC, 0755);
var fd uintptr = uintptr(fd_)

/**
 * @param fd 文件描述符
 * @param name 文件名, 可以传递空字符串 ""
 * @return 成功时返回转换成功的 os.File 结构体指针, 失败时返回 nil
 */
func os.NewFile(fd uintptr, name string) *os.File
```

### fp.Fd 方法

调用 fp.Fd 方法, 将 os.File 结构体指针 fp 转换为文件描述符 fd

```go
import (
	"os"
	"syscall"
)

fp, _ = os.OpenFile("../../README.txt", os.O_WRONLY|os.O_APPEND, 0755)
var fd uintptr = fp.Fd()
```

## test

```shell
cd build
./ch15_io
./ch15_fd_fp
./ch15_echo_server 3333
./ch15_echo_client 127.0.0.1 3333

cd build/go
./ch15_io
./ch15_fd_fp
./ch15_echo_server :3333
./ch15_echo_client 127.0.0.1:3333
```
