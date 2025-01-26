//
// Created by Tiancheng on 2024/8/25.
//

#include <fcntl.h>
#include <netinet/in.h>
#include <signal.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <unistd.h>

#define BUF_SIZE 30

int clientSocketFd;

void urgentCallback(int sig) {
  if (sig != SIGURG) return;
  char buf[BUF_SIZE];
  //* MSG_OOB 接收带外数据 (紧急字节) Out-of-Band Data
  int recvBytes = recv(clientSocketFd, buf, BUF_SIZE, MSG_OOB);
  buf[recvBytes] = '\0';
  printf("Urgent byte: %s\n", buf);
}

int main(int argc, char *argv[]) {
  if (argc != 2) {
    printf("Usage: %s <port>\n", argv[0]);
    exit(1);
  }

  struct sigaction sigAct = {0};
  sigAct.sa_handler = urgentCallback;  // 处理紧急字节
  sigemptyset(&sigAct.sa_mask);        // sa_mask 置 0
  sigAct.sa_flags = 0;                 // sa_flags 置 0

  //* 调用 sigation 函数注册信号 SIGCHLD 和信号处理器 sigAct
  if (sigaction(SIGURG /* 有紧急字节 */, &sigAct,
                NULL /* oldSigAct 不需要则传递 NULL */) == -1) {
    perror("Register signal handler failed");  // 注册信号处理器失败
    exit(1);
  }

  //* 调用 socket 函数, 服务器创建 listener
  int serverSocketFd = socket(PF_INET, SOCK_STREAM, IPPROTO_TCP);
  if (serverSocketFd == -1) {
    perror("Error created socket");
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
  }

  //* 调用 listen 函数, 监听客户端的连接请求
  if (listen(serverSocketFd, 3 /* 最大连接数 */) == -1) {
    printf("Error listened on 127.0.0.1:%d\n", ntohs(serverAddr.sin_port));
  }

  struct sockaddr_in clientAddr = {0};           // 接收客户端 IP 地址
  socklen_t clientAddrLen = sizeof(clientAddr);  // 接收客户端 IP 地址长度

  int clientSocketFd =
      accept(serverSocketFd, (struct sockaddr *)&clientAddr, &clientAddrLen);
  if (clientSocketFd == -1) {
    perror("Error accept connection");
  }

  //! unknown
  fcntl(clientSocketFd, F_SETOWN, getpid());

  char buf[BUF_SIZE];  // 子进程的缓冲区
  while (1) {
    int recvBytes = recv(clientSocketFd, buf, BUF_SIZE, 0);
    if (recvBytes <= 0) {
      break;
    }
    buf[recvBytes] = '\0';
    printf("Server receives: %s\n", buf);
  }
  close(clientSocketFd);
  close(serverSocketFd);
  return 0;
}
