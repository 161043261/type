//
// Created by Tiancheng on 2024/8/18.
//

#include <stdio.h>
#include <unistd.h>

int main() {
  int num = 10;  // 局部变量
  pid_t pid = fork();
  if (pid != 0) {  // 是父进程
    num += 2;
    //! parent proc: { id: 516876, num: 12 }
    printf("parent proc: { id: %d, num: %d }\n", pid, num);

  } else {  // 是子进程
    num -= 2;
    //! child proc: { id: 0, num: 8 }
    printf("child proc: { id: %d, num: %d }\n", pid, num);
  }
  return 0;
}
