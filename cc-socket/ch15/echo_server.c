//
// Created by Tiancheng on 2024/8/29.
//

#include <arpa/inet.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/socket.h>
#include <unistd.h>

#define BUF_SIZE 30

//!  *--- 服务器读缓冲 <-- socket 缓冲 <-- 客户端写缓冲 <--*
//!  |                                                     |
//!  |  *--------*                            *--------* send
//! buf | 服务器 |                            | 客户端 |
//!  |  *--------*                            *--------* recv
//!  |                                                     |
//!  *--> 服务器写缓冲 --> socket 缓冲 --> 客户端读缓冲 ---*

int main(int argc, char *argv[]) {
  if (argc != 2) {
    printf("Usage: %s <port>\n", argv[0]);
    exit(1);
  }

  //* 调用 socket 函数, 服务器创建 listener
  int serverSocketFd = socket(PF_INET, SOCK_STREAM, IPPROTO_TCP);
  if (serverSocketFd == -1) {
    perror("Error created socket");
    exit(1);
  }

  struct sockaddr_in serverAddr = {0};
  serverAddr.sin_family = AF_INET;  // IPv4 协议族
  // htonl 函数将一个 32 位 (4 字节) 的 int 整数从主机字节序转换为网络字节序
  serverAddr.sin_addr.s_addr =
      htonl(INADDR_ANY);  // 0.0.0.0 接受所有 IP 地址的 TCP/UDP 连接
  // htons 函数将一个 16 位 (2 字节) 的 short 整数从主机字节序转换为网络字节序
  serverAddr.sin_port = htons(atoi(argv[1]));  // 端口 = 第 1 个命令行参数

  //* 调用 bind 函数, 给 socket 套接字分配 IP 地址和端口
  if (bind(serverSocketFd, (struct sockaddr *)&serverAddr,
           sizeof(serverAddr)) ==
      -1 /* 绑定 IP 地址; 端口, 成功时返回 0, 失败时返回 -1 */) {
    perror("Error bound IP addr and port");
    exit(0);
  }

  //* 调用 listen 函数, 监听客户端的连接请求
  if (listen(serverSocketFd, 3 /* 最大连接数 */) == -1) {
    printf("Error listened on 127.0.0.1:%d\n", ntohs(serverAddr.sin_port));
    exit(1);
  }

  struct sockaddr_in clientAddr = {0};
  socklen_t clientAddrLen = sizeof(clientAddr);
  char buf[BUF_SIZE];

  int clientSocketFd =
      accept(serverSocketFd, (struct sockaddr *)&clientAddr, &clientAddrLen);
  if (clientSocketFd == -1) {
    perror("Error accepted connection");
    exit(1);
  }

  //* fdopen 函数: 将文件描述符 fd 转换为 FILE 结构体指针 fp
  FILE *readFp = fdopen(clientSocketFd, "r");
  FILE *writeFp = fdopen(clientSocketFd, "w");

  while (!feof(readFp)) {
    fgets(buf, BUF_SIZE, readFp);  //! 服务器读缓冲 <-- socket 缓冲
    printf("Recv from client %s\n", buf);
    fputs(buf, writeFp);  //! 服务器写缓冲 --> socket 缓冲
    fflush(writeFp);      //! 清空服务器写缓冲
  }
  fclose(readFp);
  fclose(writeFp);
  close(serverSocketFd);
  return 0;
}
