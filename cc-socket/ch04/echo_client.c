//
// Created by Tiancheng on 2024/8/18.
//

#include <arpa/inet.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <unistd.h>

#define BUF_SIZE 30

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
    exit(1);
  }

  char send[BUF_SIZE];
  char recv[BUF_SIZE];
  while (1) {
    fputs("Input: ", stdout);
    fgets(send, BUF_SIZE, stdin);
    // send[strlen(send) - 1] = '\0'; // 将 \n 替换为 \0
    write(clientSocketFd, send, strlen(send));
    // memset(recv, '\0', BUF_SIZE); //! 将 recv 中所有元素置为 '\0'
    int readBytes = read(clientSocketFd, recv, BUF_SIZE);
    if (readBytes == -1) {
      break;
    }
    recv[readBytes] = '\0';  //! 隔离脏数据
    printf("Echo from server %s\n", recv);
  }
  close(clientSocketFd);
  return 0;
}
