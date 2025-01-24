//
// Created by Tiancheng on 2024/8/25.
//

#include <stdio.h>
#include <sys/select.h>
#include <sys/time.h>
#include <unistd.h>

#define BUF_SIZE 30

int main() {
  fd_set fdSet;            // 文件描述符的集合
  struct timeval timeout;  // 超时
  char buf[BUF_SIZE];

  FD_ZERO(&fdSet);  // fdSet 置 0, 不监听所有的文件描述符
  //!  fd0   fd1   fd2
  // *-----*-----*-----*----
  // |  0  |  0  |  0  | ...
  // *-----*-----*-----*----
  FD_SET(0, &fdSet);  // 监听标准输入 stdin
  //!  fd0   fd1   fd2
  // *-----*-----*-----*----
  // |  1  |  0  |  0  | ...
  // *-----*-----*-----*----

  fd_set backup;
  while (1) {
    backup = fdSet;  // 备份 fdSet
    // 超时 3s
    timeout.tv_sec = 5;   // 秒
    timeout.tv_usec = 0;  // 毫秒
    int numReady =        //! numReady - IO 就绪的 fd 数量
        select(1,         //! numFd - fd_set 的最大 fd 值 +1
               &backup,  //! readFdSet - &fd_set 监听是否可读, NULL 表示不监听
               NULL,  //! writeFdSet - &fd_set 监听是否可写, NULL 表示不监听
               NULL,  //! exceptFdSet - &fd_set 监听有无异常, NULL 表示不监听
               &timeout);  //! timeout 超时
    if (numReady == -1) {  //! 有异常返回 -1
      perror("[ERROR] Select error");
      break;
    }
    if (numReady == 0) {  //! 超时返回 0
      puts("Timeout!");
      continue;
    }
    //! 有 fd 可读/写时, 返回 IO 就绪的 fd
    if (FD_ISSET(0, &backup)) {  // stdin 是否可读
      // memset(buf, '\0', BUF_SIZE);
      int readBytes = read(0 /* fd */, buf, BUF_SIZE);
      buf[readBytes] = '\0';  //! 隔离脏数据
      printf("Read from stdin %s\n", buf);
    }
  }
  return 0;
}
