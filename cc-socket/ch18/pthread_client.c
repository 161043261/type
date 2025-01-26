//
// Created by Tiancheng on 2024/9/1.
//

#include <arpa/inet.h>
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <unistd.h>

#define BUF_SIZE 30
typedef void *any;

any sendMsg(any arg) {
  int clientSocketFd = *(int *)arg;
  char buf[BUF_SIZE];
  while (1) {
    fgets(buf, BUF_SIZE - 10, stdin);
    if (strcasecmp(buf, "q\n") == 0) {
      close(clientSocketFd);
      return NULL;
    }

    //! 将 '\n' 替换为 '\0'
    buf[strlen(buf) - 1] = '\0';
    //! strlen(buf) 不计算 '\0'
    write(clientSocketFd, buf, strlen(buf) + 1);
  }
}

any recvMsg(any arg) {
  int clientSocketFd = *(int *)arg;
  char buf[BUF_SIZE];
  while (1) {
    int readLen = read(clientSocketFd, buf, BUF_SIZE);
    if (readLen <= 0) {
      return NULL;
    }
    printf("[INFO] Echo from server %s\n", buf);
  }
}

int main(int argc, char *argv[]) {
  if (argc != 3) {
    printf("Usage: %s <serverAddr> <serverPort>\n", argv[0]);
    exit(1);
  }

  int clientSocketFd = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);

  struct sockaddr_in serverAddr = {0};
  serverAddr.sin_family = AF_INET;
  serverAddr.sin_addr.s_addr = inet_addr(argv[1]);
  serverAddr.sin_port = htons(atoi(argv[2]));

  if (connect(clientSocketFd, (struct sockaddr *)&serverAddr,
              sizeof(serverAddr)) == -1) {
    printf("Error connected to server\n");
    exit(1);
  }

  pthread_t sendThreadId;
  pthread_t recvThreadId;

  pthread_create(&sendThreadId, NULL, sendMsg,
                 &clientSocketFd);  // 创建发送线程
  pthread_create(&recvThreadId, NULL, recvMsg,
                 &clientSocketFd);  // 创建接收线程

  pthread_join(sendThreadId, NULL);  // 主进程等待发送进程终止
  pthread_join(recvThreadId, NULL);  // 主进程等待接收进程终止
  close(clientSocketFd);
  return 0;
}