//
// Created by Tiancheng on 2024/8/19.
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
  serverAddr.sin_family = AF_INET;
  serverAddr.sin_addr.s_addr = inet_addr(argv[1]);  // serverAddr
  serverAddr.sin_port = htons(atoi(argv[2]));       // serverPort

  //* 创建已连接 UDP 套接字
  //* 客户端调用 connect 函数, 向服务器发送连接请求
  connect(clientSocketFd, (struct sockaddr *)&serverAddr, sizeof(serverAddr));

  char send[BUF_SIZE];
  char recv[BUF_SIZE];
  while (1) {
    fputs("Input: ", stdout);
    fgets(send, BUF_SIZE, stdin);
    // send[strlen(send) - 1] = '\0'; // 将 \n 替换为 \0
    // 客户端向服务器发送 UDP 数据报, 客户端自动分配本机 IP 地址和端口
    write(clientSocketFd, send, strlen(send));
    // memset(recv, '\0', BUF_SIZE); //! 将 recv 中所有元素置为 '\0'
    //! 从 clientSocketFd 中读出 BUF_SIZE 个字节, 写入 recv 缓冲区
    ssize_t readBytes = read(clientSocketFd, recv, BUF_SIZE);
    if (readBytes <= 0) {
      break;
    }
    recv[readBytes] = '\0';  //! 隔离脏数据
    printf("Echo from server %s\n", recv);
  }
  close(clientSocketFd);
  return 0;
}
