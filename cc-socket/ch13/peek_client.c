//
// Created by Tiancheng on 2024/8/26.
//

#include <arpa/inet.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
  if (argc != 3) {
    printf("Usage: %s <serverAddr> <serverPort>\n", argv[0]);
    exit(1);
  }

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

  write(clientSocketFd, "123", strlen("123"));
  close(clientSocketFd);
}
