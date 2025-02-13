//
// Created by Tiancheng on 2024/8/18.
//

#include <stdio.h>
#include <sys/wait.h>
#include <unistd.h>

int main() {
  int status;  // 接收子进程的运行状态
  pid_t pid = fork();
  if (pid == 0) {
    printf("Here's child proc\n");
    sleep(12);  // 子进程睡眠 12s
    return 12;
  }
  // 是父进程
  printf("Here's parent proc, child proc pid: %d\n", pid);
  int i = 1;
  while (waitpid(-1 /* -1 等待任一子进程终止 */, &status,
                 WNOHANG /* 没有子进程终止时, 父进程不会阻塞 */) != -1) {
    printf("[%d] Parent proc sleeps 3s\n", i++);
    sleep(3);  // 父进程睡眠 3s
  }
  if (WIFEXITED(status)) {
    printf("Child proc returns %d\n", WEXITSTATUS(status));
  }
  return 0;
}
