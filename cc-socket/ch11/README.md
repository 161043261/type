# 通过管道的进程间通信 IPC Inter-process Communication

调用 pipe 函数创建单向管道

```c
#include <unistd.h>
/**
 * @param fd[0] 接收数据使用的文件描述符, 即管道出口
 * @param fd[1] 发送数据使用的文件描述符, 即管道入口
 * @return 成功时返回 0, 失败时返回 -1
 */
int pipe(int fd[2]);
```

通过管道的单向 IPC [test_pipe1.c](./test_pipe1.c)

单管道实现双向 IPC [test_pipe2.c](./test_pipe2.c)

双管道实现并发双向 IPC [test_pipe3.c](./test_pipe3.c)

test

```shell
cd build
./ch11_test_pipe1
./ch11_test_pipe2
./ch11_test_pipe3

./ch11_pipe_server 3333
./ch10_multi-proc_client 127.0.0.1 3333
```
