//
// Created by Tiancheng on 2024/8/18.
//

#include <signal.h>
#include <stdio.h>
#include <unistd.h>

// 定义信号处理函数 timeoutCallback
void timeoutCallback(int sig) {
  if (sig == SIGALRM) {
    puts("Timeout!");
  }
  alarm(2);  // 预约 2s 后产生 SIGALRM 信号, 触发 timeoutCallback
}

int main() {
  // 创建信号处理器 sigAct
  struct sigaction sigAct = {0};
  sigAct.sa_handler = timeoutCallback;
  sigemptyset(&sigAct.sa_mask);  // sa_mask 置 0
  sigAct.sa_flags = 0;           // sa_flags 置 0
  // 注册信号 SIGALRM 和信号处理器 sigAct
  sigaction(SIGALRM /* alarm 函数注册的 timeout 时间到 */, &sigAct,
            0 /* oldSigAct 不需要则传递 0 */);
  alarm(10);  // 预约 10s 后产生 SIGALRM 信号, 触发 timeoutCallback
  for (int i = 1; i <= 5; i++) {
    printf("[%d/5] Sleep for a while\n", i);
    //! 第 1 次循环: 进程睡眠 100s, 10s 后会被操作系统唤醒, 以执行
    //! timeoutCallback 第 2~5 次循环: 每 2s 执行 timeoutCallback 用户输入
    sleep(100);
  }
  return 0;
}
