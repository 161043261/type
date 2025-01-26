//
// Created by admin on 2024/10/15.
//
#include <assert.h>
#include <fcntl.h>
#include <stdio.h>
#include <sys/sendfile.h>
#include <unistd.h>

int main() {
  // 只读
  int inputFd = open("../README.md", O_RDONLY);
  assert(inputFd != -1);
  // 只写; 必要时创建; 重写
  int outputFd = open("../README.txt", O_WRONLY | O_CREAT | O_TRUNC, 0644);
  assert(outputFd != -1);
  off_t offset = 0;  // offset 将被拷贝到 socket 缓冲区
  ssize_t nSentBytes = sendfile(outputFd, inputFd, &offset, 1024);
  assert(nSentBytes != -1);
  close(inputFd);
  close(outputFd);
  return 0;
}
