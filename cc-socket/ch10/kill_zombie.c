//
// Created by Tiancheng on 2024/8/18.
//

#include <signal.h>
#include <stdio.h>
#include <sys/wait.h>
#include <unistd.h>

void childExitCallback(int sig) {
  int status;
  pid_t pid = waitpid(-1 /* -1 等待任一子进程终止 */, &status,
                      WNOHANG /* 没有子进程终止时, 父进程不会阻塞 */);
  if (WIFEXITED(status)) {
    printf("Remove child proc { pid: %d, return: %d }\n", pid,
           WEXITSTATUS(status));
  }
}

int main() {
  struct sigaction sigAct = {0};
  sigAct.sa_handler = childExitCallback;
  sigemptyset(&sigAct.sa_mask);  // sa_mask 置 0
  sigAct.sa_flags = 0;           // sa_flags 置 0
  sigaction(SIGCHLD /* 子进程终止 */, &sigAct,
            0 /* oldSigAct 不需要则传递 0 */);
  pid_t pid = fork();  // 创建子进程
  if (pid == 0) {      // 是子进程
    puts("Here's child proc, sleeps 10s");
    sleep(10);
    return 12;
  }
  // 是父进程
  printf("Here's parent proc, child proc pid: %d\n", pid);
  for (int i = 1; i <= 5; i++) {
    printf("[%d/5] Parent proc sleeps 5s\n", i);
    sleep(5);
  }
  return 0;
}
