//
// Created by Tiancheng on 2024/8/18.
//

#include <stdio.h>
#include <unistd.h>

int main() {
  pid_t pid = fork();
  if (pid == 0) {
    puts("Here's child proc");
  } else {
    printf("Here's parent proc, child proc pid: %d\n", pid);
    sleep(30);  // 父进程睡眠 30s
  }
  if (pid == 0) {
    puts("Ended child proc");  //! 子进程先于父进程结束,
                               //! 父进程未释放子进程的资源,
                               //! 子进程成为僵尸进程
  } else {
    puts("Ended parent proc");
  }
  return 0;
}
