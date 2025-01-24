//
// Created by Tiancheng on 2024/8/16.
//

#include <arpa/inet.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/socket.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
  if (argc != 3) {
    printf("Usage: %s <serverAddr> <serverPort>\n", argv[0]);
    exit(1);
  }

  //* 调用 socket 函数, 创建 socket 套接字
  //* 如果继续调用 bind, listen 函数, 将成为服务器套接字
  //* 如果继续调用 connect 函数, 将成为客户端套接字
  int clientSocketFd = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
  if (clientSocketFd == -1) {
    printf("Error created socket\n");
  }

  struct sockaddr_in serverAddr = {0};
  serverAddr.sin_family = AF_INET;
  serverAddr.sin_addr.s_addr = inet_addr(argv[1]);
  serverAddr.sin_port = htons(atoi(argv[2]));

  //* 客户端调用 connect 函数, 向服务器发送连接请求
  if (connect(clientSocketFd, (struct sockaddr *)&serverAddr,
              sizeof(serverAddr)) == -1) {
    printf("Error connected to server\n");
  }

  //* 客户端调用 read 函数, 每次读出一个字符
  char buf[32];  // buffer
  int i = 0, totalBytes = 0;
  while (1) {
    //! 从 clientSocketFd 中读出 1 个字节, 写入 buf
    int readBytes = read(clientSocketFd, &buf[i++], 1);
    if (readBytes <= 0) {
      break;
    }
    totalBytes += readBytes;
  }
  printf("Echo from server: %s\n", buf);
  printf("Message length: %d\n", totalBytes);
  close(clientSocketFd);
  return 0;
}