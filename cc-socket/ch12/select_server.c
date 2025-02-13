//
// Created by Tiancheng on 2024/8/18.
//

#include <arpa/inet.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/select.h>
#include <sys/socket.h>
#include <sys/time.h>
#include <unistd.h>

#define BUF_SIZE 30

int main(int argc, char *argv[]) {
  if (argc != 2) {
    printf("Usage: %s <port>\n", argv[0]);
    exit(1);
  }

  int serverSocketFd = socket(PF_INET, SOCK_STREAM, IPPROTO_TCP);
  if (serverSocketFd == -1) {
    perror("Error created socket");
  }

  struct sockaddr_in serverAddr = {0};
  serverAddr.sin_family = AF_INET;
  serverAddr.sin_addr.s_addr =
      htonl(INADDR_ANY);  // 0.0.0.0 接受所有 IP 地址的 TCP/UDP 连接
  serverAddr.sin_port = htons(atoi(argv[1]));

  if (bind(serverSocketFd, (struct sockaddr *)&serverAddr,
           sizeof(serverAddr)) == -1) {
    perror("Error bound IP addr and port");
  }

  if (listen(serverSocketFd, 3) == -1) {
    printf("Error listened on 127.0.0.1:%d\n", ntohs(serverAddr.sin_port));
  }

  fd_set backup, fdSet;
  struct timeval timeout;
  char buf[BUF_SIZE];

  FD_ZERO(&fdSet);  // fdSet 置 0, 不监听所有的文件描述符
  FD_SET(serverSocketFd, &fdSet);  //* 监听 serverSocketFd
  int numFd = serverSocketFd + 1;

  while (1) {
    backup = fdSet;          // 备份 fdSet
    timeout.tv_sec = 5;      // 秒
    timeout.tv_usec = 5000;  // 毫秒

    int numReady =     //! numReady - IO 就绪 fd 数量
        select(numFd,  //! numFd       - fd_set 的最大 fd 值 +1 (fd 的数量)
               &backup,  //! readFdSet - &fd_set 监听是否可读, NULL 表示不监听
               NULL,  //! writeFdSet   - &fd_set 监听是否可写, NULL 表示不监听
               NULL,  //! exceptFdSet  - &fd_set 监听有无异常, NULL 表示不监听
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
    for (int i = 0; i < numFd; i++) {
      if (!FD_ISSET(i, &backup)) {
        continue;
      }
      printf("fd[%d/%d] is ready to read\n", i, numFd - 1);
      //! 服务器 listener 套接字 serverSocketFd 可读
      if (i == serverSocketFd) {
        struct sockaddr_in clientAddr = {0};
        socklen_t clientAddrLen = sizeof(clientAddr);
        int clientSocketFd = accept(
            serverSocketFd, (struct sockaddr *)&clientAddr, &clientAddrLen);
        FD_SET(clientSocketFd,
               &backup);  //* 监听 clientSocketFd
        if (numFd < clientSocketFd + 1) {
          numFd = clientSocketFd + 1;
        }
        printf("Accepted client fd[%d/%d]\n", clientSocketFd, numFd - 1);
        continue;
      }
      //! 服务器与客户端的连接套接字 clientSocketFd 可读
      int clientSocketFd = i;
      while (1) {
        int readBytes = read(clientSocketFd, buf, BUF_SIZE);
        if (readBytes <= 0) {
          FD_CLR(clientSocketFd,
                 &backup);        //* 不再监听 clientSocketFd
          close(clientSocketFd);  //* 断开服务器与客户端的连接
          printf("Closed client fd[%d/%d]\n", clientSocketFd, numFd - 1);
          break;
        }
        printf("Readed client fd[%d/%d]\n", clientSocketFd, numFd - 1);
        write(clientSocketFd, buf, readBytes);
      }
    }
  }
}
