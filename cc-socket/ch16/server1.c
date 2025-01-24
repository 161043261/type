//
// Created by Tiancheng on 2024/8/30.
//

#include <arpa/inet.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/socket.h>
#include <unistd.h>

#define BUF_SIZE 30

int main(int argc, char *argv[]) {
  if (argc != 2) {
    printf("Usage: %s <port>\n", argv[0]);
    exit(1);
  }
  int serverSocketFd = socket(PF_INET, SOCK_STREAM, IPPROTO_TCP);
  struct sockaddr_in serverAddr = {0};
  serverAddr.sin_family = AF_INET;  // IPv4 协议族
  // 0.0.0.0 接受所有 IP 地址的 TCP/UDP 连接
  serverAddr.sin_addr.s_addr = htonl(INADDR_ANY);
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

  //* fdopen 函数: 将文件描述符转换为 FILE 结构体指针
  FILE *readFp = fdopen(clientSocketFd, "r");
  FILE *writeFp = fdopen(clientSocketFd, "w");

  fputs("[INFO] 1st\n", writeFp);
  fputs("[INFO] 2nd\n", writeFp);
  fputs("[INFO] 3rd\n", writeFp);
  fflush(writeFp);
  //! 文件读; 写指针使用相同文件描述符创建
  //! 关闭任一文件指针时, 都会都会断开双向 IO 流
  fclose(writeFp);  //! 同时断开输入/输出流, 不能读写数据

  fgets(buf, BUF_SIZE, readFp);
  fputs(buf, stdout);
  fclose(readFp);
  return 0;
}