//
// Created by Tiancheng on 2024/8/18.
//

#include <stdio.h>
#include <stdlib.h>
#include <sys/wait.h>
#include <unistd.h>

int main() {
  int status;  // 接收子进程的运行状态

  pid_t pidA = fork();  // 创建子进程 procA
  if (pidA == 0) {      // 子进程 procA
    puts("Here's child procA");
    return 3;
  }
  // 是父进程
  printf("Here's parent proc, child procA pid: %d\n", pidA);
  wait(&status);  // 父进程等待任一子进程终止
  if (WIFEXITED(status)) {
    printf("Child procA returns %d\n", WEXITSTATUS(status));
  }

  pid_t pidB = fork();  // 创建子进程 procB
  if (pidB == 0) {      // 子进程 procB
    puts("Here's child procB");
    exit(7);
  }
  // 是父进程
  printf("Here's parent proc, child procB pid: %d\n", pidB);
  wait(&status);  // 父进程等待任一子进程终止
  if (WIFEXITED(status)) {
    printf("Child procB returns %d\n", WEXITSTATUS(status));
  }
  return 0;
}
