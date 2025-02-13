//
// Created by Tiancheng on 2024/8/18.
//

#include <stdio.h>
#include <unistd.h>
#define BUF_SIZE 30

// 双管道实现双向 IPC
int main() {
  int fd1[2];  // parent fd1[0] <----- fd1[1] child
  int fd2[2];  // child fd2[0] <----- fd2[1] parent
  pipe(fd1);   // 创建管道
  pipe(fd2);   // 创建管道
  char buf[BUF_SIZE];
  pid_t pid = fork();
  if (pid == 0) {  // 是子进程
    printf("Here's child proc\n");
    char str1[] = "How are you?";
    write(fd1[1], str1,
          sizeof(str1));  // 子进程使用 fd1[1] 发送数据 --------------------*
    read(fd2[0], buf, BUF_SIZE);  // 子进程使用 fd2[0] 接收数据 <--------* |
    printf("Child proc read: %s\n", buf);  //                            | |
  } else {  // 是父进程                                                  |  |
    printf("Here's parent proc, child proc pid: %d\n", pid);  //         | |
    read(fd1[0], buf,
         BUF_SIZE);  // 父进程使用 fd1[0] 接收数据 <--------|--*
    printf("Parent proc read: %s\n", buf);  //                           |
    char str2[] = "I'm fine thank you.";    //                           |
    write(fd2[1], str2, sizeof(str2));  // 父进程使用 fd2[1] 发送数据 ---*
  }
  return 0;
}