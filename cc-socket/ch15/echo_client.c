//
// Created by Tiancheng on 2024/8/29.
//

#include <arpa/inet.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>

#define BUF_SIZE 30

//!  *--- 服务器读缓冲 <-- socket 缓冲 <-- 客户端写缓冲 <--*
//!  |                                                     |
//!  |  *--------*                            *--------* send
//! buf | 服务器 |                            | 客户端 |
//!  |  *--------*                            *--------* recv
//!  |                                                     |
//!  *--> 服务器写缓冲 --> socket 缓冲 --> 客户端读缓冲 ---*

int main(int argc, char *argv[]) {
  if (argc != 3) {
    printf("Usage: %s <serverAddr> <serverPort>\n", argv[0]);
    exit(1);
  }
  //* 调用 socket 函数, 创建 socket 套接字
  int clientSocketFd = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
  if (clientSocketFd == -1) {
    printf("Error created socket\n");
    exit(1);
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

  //* fdopen 函数: 将文件描述符 fd 转换为 FILE 结构体指针 fp
  FILE *readFp = fdopen(clientSocketFd, "r");
  FILE *writeFp = fdopen(clientSocketFd, "w");
  char send[BUF_SIZE];
  char recv[BUF_SIZE];

  while (1) {
    fputs("Input: ", stdout);
    fgets(send, BUF_SIZE, stdin);
    if (strcasecmp(send, "q\n") == 0) {
      break;
    }
    // send[strlen(send) - 1] = '\0'; // 将 \n 替换为 \0
    fputs(send, writeFp);           //! socket 缓冲 <-- 客户端写缓冲
    fflush(writeFp);                //! 清空客户端写缓冲
    fgets(recv, BUF_SIZE, readFp);  //! socket 缓冲 --> 客户端读缓冲
    printf("Echo from server %s\n", recv);
  }
  fclose(writeFp);
  fclose(readFp);
  return 0;
}
