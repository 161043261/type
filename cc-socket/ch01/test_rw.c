//
// Created by Tiancheng on 2024/8/26.
//

#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#define BUF_SIZE 30

int main() {
  // 写文件
  int fd = open("./README.txt", O_CREAT | O_WRONLY | O_TRUNC);
  if (fd == -1) {
    perror("[ERROR] Open error");
    exit(1);
  }
  printf("Write fd = %d\n", fd);

  char buf[BUF_SIZE] = "Hello World!\n";
  if (write(fd, buf, sizeof(buf)) == -1) {
    perror("[ERROR] Write error");
    exit(1);
  }
  close(fd);

  // 读文件
  fd = open("./README.txt", O_RDONLY);
  if (fd == -1) {
    perror("[ERROR] Open error");
  }
  printf("Read fd = %d\n", fd);

  memset(buf, '\0', BUF_SIZE);
  if (read(fd, buf, BUF_SIZE) == -1) {
    perror("[ERROR] Read error");
    exit(1);
  }
  printf("Read: %s\n", buf);
  close(fd);
  return 0;
}