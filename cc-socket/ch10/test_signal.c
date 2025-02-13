//
// Created by Tiancheng on 2024/8/18.
//

#include <signal.h>
#include <stdio.h>
#include <unistd.h>

// 定义信号处理函数 timeoutCallback_
void timeoutCallback(int sig) {
  if (sig == SIGALRM) {
    puts("Timeout!");
  }
  alarm(2);  // 预约 2s 后产生 SIGALRM 信号, 触发 timeoutCallback
}

// 定义信号处理函数 keyboardCallback_
void keyboardCallback(int sig) {
  if (sig == SIGINT) {
    puts("\nCRTL+C pressed!");
  }
}

int main() {
  // 注册信号 SIGALRM 和信号处理函数 timeoutCallback
  signal(SIGALRM /* alarm 函数注册的 timeout 时间到 */, timeoutCallback);
  // 注册信号 SIGINT 和信号处理函数 keyboardCallback
  signal(SIGINT /* 用户输入 CTRL+C */, keyboardCallback);
  alarm(10);  // 预约 10s 后产生 SIGALRM 信号, 触发 timeoutCallback
  for (int i = 1; i <= 5; i++) {
    printf(
        "[%d/5] Sleep for a while, press CTRL+C to trigger "
        "keyboardCallback\n",
        i);
    //! 第 1 次循环: 进程睡眠 100s, 10s 后会被操作系统唤醒, 以执行
    //! timeoutCallback 第 2~5 次循环: 每 2s 执行 timeoutCallback 用户输入
    //! CTRL+C 时, 也会被操作系统唤醒, 以执行 keyboardCallback
    sleep(100);
  }
  return 0;
}
