//
// Created by Tiancheng on 2024/8/30.
//

#include <stdio.h>
#include <unistd.h>

int main() {
  int dupFd1 = dup(1 /* stdout */);
  int dupFd2 = dup2(dupFd1, 7);
  printf("dupFd1 = %d; dupFd2 = %d\n", dupFd1,
         dupFd2);  // dupFd1 = 3; dupFd2 = 7

  char str1[] = "Aloha, here's dupFd1\n";
  char str2[] = "Hello, here's dupFd2\n";
  write(dupFd1, str1, sizeof(str1));
  write(dupFd2, str2, sizeof(str2));
  close(dupFd1);  // 关闭 dupFd1
  close(dupFd2);  // 关闭 dupFd2
  // stdout 未关闭
  write(1, str1, sizeof(str1));  // cout << str1; 成功
  close(1);
  write(1, str2, sizeof(str2));  // cout << str2; 失败
  return 0;
}
