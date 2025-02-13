//
// Created by Tiancheng on 2024/8/18.
//

#include <arpa/inet.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <sys/wait.h>
#include <unistd.h>

#define BUF_SIZE 30

int main(int argc, char *argv[]) {
  if (argc != 3) {
    printf("Usage: %s <serverAddr> <serverPort>\n", argv[0]);
    exit(1);
  }

  //* 调用 socket 函数, 创建 socket 套接字
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
  char buf[BUF_SIZE];
  pid_t pid = fork();  // 创建子进程
  if (pid == 0) {      // 子进程负责发送数据
    while (1) {
      fgets(buf, BUF_SIZE, stdin);
      if (strcasecmp(buf, "q\n") == 0) {
        shutdown(clientSocketFd,
                 SHUT_WR);  //* 断开输出流, 向服务器发送 EOF
        break;
      }
      // buf[strlen(buf) - 1] = '\0'; // 将 \n 替换为 \0
      write(clientSocketFd, buf, strlen(buf));
      continue;
    }
  } else {  // 父进程负责接收数据
    while (1) {
      // memset(buf, '\0', BUF_SIZE);
      int readBytes = read(clientSocketFd, buf, BUF_SIZE);
      if (readBytes <= 0) break;
      buf[readBytes] = '\0';  //! 隔离脏数据
      printf("Echo from server '%s'.\n", buf);
    }
  }

  close(clientSocketFd);  // 父子进程断开与服务器的连接
  return 0;
}
