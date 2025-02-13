//
// Created by Tiancheng on 2024/8/26.
//

#include <stdio.h>
#include <string.h>
#include <sys/uio.h>

int main() {
  const int iovecLen = 2;
  struct iovec iovecArr[iovecLen];
  char buf1[] = "abcdefg";
  char buf2[] = "123";
  iovecArr[0].iov_base = buf1;
  iovecArr[0].iov_len = strlen(buf1);
  iovecArr[1].iov_base = buf2;
  iovecArr[1].iov_len = strlen(buf2);

  int writeBytes = writev(1 /* stdout */, iovecArr, iovecLen);
  printf("\nWrite bytes: %d\n", writeBytes);
  return 0;
}
