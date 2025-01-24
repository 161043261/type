//
// Created by Tiancheng on 2024/8/18.
//

#include <stdio.h>
#include <sys/wait.h>
#include <unistd.h>

#define BUF_SIZE 30

// 单管道实现双向 IPC
int main() {
  int fd[2];
  pipe(fd);  // 创建管道
  pid_t pid = fork();

  char buf[BUF_SIZE];
  if (pid == 0) {  // 是子进程
    printf("Here's child proc\n");
    char str1[] = "How are you?";
    write(fd[1], str1, sizeof(str1));  // 子进程使用 fd[1] 发送数据 ---*
    sleep(2);  // 子进程睡眠 2s                                        |
    read(fd[0], buf, BUF_SIZE);  // 子进程使用 fd[0] 接收数据 <--------|---*
    printf("Child proc read: %s\n", buf);  //                          |   |
  } else {  // 是父进程                                                |   |
    printf("Here's parent proc, child proc pid: %d\n", pid);  //       |   |
    read(fd[0], buf, BUF_SIZE);  // 父进程使用 fd[0] 接收数据 <--------*   |
    printf("Parent proc read: %s\n", buf);  //                             |
    char str2[] = "I'm fine thank you.";    //                             |
    write(fd[1], str2, sizeof(str2));  // 父进程使用 fd[1] 发送数据 -------*

    int status;     // 接收子进程的运行状态
    wait(&status);  // 父进程等待任一子进程终止
    // waitpid(-1 /* -1 父进程等待任一子进程终止 */, &status, NULL);
  }
  return 0;
}
