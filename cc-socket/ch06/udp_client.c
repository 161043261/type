//
// Created by Tiancheng on 2024/8/18.
//

#include <arpa/inet.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <unistd.h>

#define BUF_SIZE 32

int main(int argc, char *argv[]) {
  if (argc != 3) {
    printf("Usage: %s <serverAddr> <serverPort>\n", argv[0]);
    exit(1);
  }

  //* 调用 socket 函数, 创建 UDP socket 套接字
  int clientSocketFd = socket(AF_INET, SOCK_DGRAM, IPPROTO_UDP);
  if (clientSocketFd == -1) {
    printf("Error created socket\n");
  }

  struct sockaddr_in serverAddr = {0};
  socklen_t serverAddrLen = sizeof(serverAddr);
  serverAddr.sin_family = AF_INET;
  serverAddr.sin_addr.s_addr = inet_addr(argv[1]);
  serverAddr.sin_port = htons(atoi(argv[2]));

  char send[BUF_SIZE];
  char recv[BUF_SIZE];
  while (1) {
    fputs("Input: ", stdout);
    fgets(send, BUF_SIZE, stdin);
    // send[strlen(send) - 1] = '\0'; // 将 \n 替换为 \0
    // 客户端向服务器发送 UDP 数据报, 客户端自动分配本机 IP 地址和端口
    sendto(clientSocketFd, send, strlen(send), 0,
           (struct sockaddr *)&serverAddr, sizeof(serverAddr));
    // memset(recv, '\0', BUF_SIZE); //! 将 recv 中所有元素置为 '\0'
    ssize_t recvBytes =
        recvfrom(clientSocketFd, recv, BUF_SIZE, 0,
                 (struct sockaddr *)&serverAddr, &serverAddrLen);
    if (recvBytes <= 0) break;
    recv[recvBytes] = '\0';  //! 隔离脏数据
    printf("Echo from server %s\n", recv);
  }
  close(clientSocketFd);
  return 0;
}
