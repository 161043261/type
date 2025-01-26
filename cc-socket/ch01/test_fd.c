//
// Created by Tiancheng on 2024/8/26.
//

#include <arpa/inet.h>
#include <fcntl.h>
#include <stdio.h>
#include <sys/socket.h>
#include <unistd.h>

int main() {
  int fd1 = socket(PF_INET, SOCK_STREAM, IPPROTO_TCP);
  int fd2 = socket(PF_INET, SOCK_DGRAM, IPPROTO_UDP);
  //! O_CREAT 文件不存在则创建文件
  //! O_RDONLY 只读; O_WRONLY 只写; O_TRUNC 重写
  int fd3 = open("./README.txt", O_CREAT | O_WRONLY | O_TRUNC);
  printf("fd1 = %d\n", fd1);
  printf("fd2 = %d\n", fd2);
  printf("fd3 = %d\n", fd3);
  close(fd1);
  close(fd2);
  close(fd3);
  return 0;
}