//
// Created by Tiancheng on 2024/8/18.
//

#include <stdio.h>
#include <unistd.h>

#define BUF_SIZE 30

// 通过管道的单向 IPC
int main() {
  int fd[2];
  pipe(fd);  // 创建管道
  pid_t pid = fork();
  if (pid == 0) {  // 是子进程
    printf("Here's child proc\n");
    char str[] = "How are you?";
    write(fd[1] /* 接收数据使用的文件描述符, 即管道出口 */, str,
          sizeof(str));  // 子进程使用 fd[1] 接收数据
  } else {               // 是父进程
    printf("Here's parent proc, child proc pid: %d\n", pid);
    char buf[BUF_SIZE];
    read(fd[0] /* 发送数据使用的文件描述符, 即管道入口 */, buf,
         BUF_SIZE);  // 父进程使用 fd[0] 发送数据
    printf("Parent proc read: %s\n", buf);
  }
  return 0;
}
