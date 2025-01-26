//
// Created by Tiancheng on 2024/8/26.
//

#include <stdio.h>
#include <string.h>
#include <sys/uio.h>

#define BUF_SIZE 10

int main() {
  const int iovecLen = 2;
  struct iovec iovecArr[iovecLen];
  char buf1[BUF_SIZE] = {1};
  char buf2[BUF_SIZE] = {2};
  iovecArr[0].iov_base = buf1;
  iovecArr[0].iov_len = 3;
  iovecArr[1].iov_base = buf2;
  iovecArr[1].iov_len = BUF_SIZE;

  int readBytes = readv(0 /* stdin */, iovecArr, iovecLen);
  printf("Read bytes: %d\n", readBytes);
  printf("1st message: %s\n", buf1);
  printf("2nd message: %s\n", buf2);
  return 0;
}
