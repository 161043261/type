//
// Created by Tiancheng on 2024/8/15.
//

#include <arpa/inet.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/socket.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
  if (argc != 2) {
    printf("[ERROR] Usage: %s <serverPort>\n", argv[0]);
    exit(1);
  }

  //* 调用 socket 函数, 创建 socket 套接字
  int serverSocketFd =  //! IPPROTO_IP/* Dummy protocol for TCP.  */
      socket(PF_INET, SOCK_STREAM, IPPROTO_IP /* 0 */);
  // server socket file descriptor

  if (serverSocketFd == -1) {
    printf("Error created socket\n");
  }

  struct sockaddr_in serverAddr = {0};
  serverAddr.sin_family = AF_INET;  // IPv4 协议族
  serverAddr.sin_addr.s_addr =
      htonl(INADDR_ANY);  // 0.0.0.0 接受所有 IP 地址的 TCP/UDP 连接
  serverAddr.sin_port = htons(atoi(argv[1]));  // 端口 = 第 1 个命令行参数

  //* 调用 bind 函数, 给 socket 套接字分配 IPv4 地址和端口
  if (bind(serverSocketFd, (struct sockaddr *)&serverAddr,
           sizeof(serverAddr)) ==
      -1 /* 绑定 IP 地址; 端口, 成功时返回 0, 失败时返回 -1 */) {
    printf("Error bound IP addr and port\n");
  }

  //* 调用 listen 函数, 监听客户端的连接请求
  if (listen(serverSocketFd, 5) == -1) {
    printf("Error listened on 127.0.0.1:%d\n", serverAddr.sin_port);
    exit(1);
  }

  //* 服务器调用 accept 函数, 接受客户端的连接请求
  struct sockaddr_in clientAddr = {0};
  socklen_t clientAddrSize = sizeof(clientAddr);
  int clientSocketFd =
      accept(serverSocketFd, (struct sockaddr *)&clientAddr, &clientAddrSize);
  if (clientSocketFd == -1) {
    printf("Error accepted connection\n");
  }

  //* 服务器调用 write 函数, 写数据
  char message[] = "Hello World!";
  write(clientSocketFd, message, sizeof(message));
  close(clientSocketFd);
  close(serverSocketFd);
  return 0;
}