//
// Created by Tiancheng on 2024/9/1.
//

#include <arpa/inet.h>
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/socket.h>
#include <unistd.h>

#define BUF_SIZE 30
#define CLIENT_CAP 3

int fdArrLen = 0;
int fdArr[CLIENT_CAP];
pthread_mutex_t mut;

typedef void *any;

any clientHandler(any arg) {
  int clientSocketFd = *(int *)arg;
  char buf[BUF_SIZE];
  while (1) {
    int readLen = read(clientSocketFd, buf, sizeof(buf));
    if (readLen <= 0) {
      pthread_mutex_lock(&mut);  // 加锁
      for (int i = 0; i < fdArrLen; i++) {
        if (clientSocketFd != fdArr[i]) {
          continue;
        }
        //* clientSocketFd == fdArr[i]
        while (i < fdArrLen - 1) {
          fdArr[i] = fdArr[i + 1];
          i++;
        }
        fdArrLen -= 1;

        printf("[DEBUG] fdArr");
        for (int i = 0; i < fdArrLen; i++) {
          printf(" %d", fdArr[i]);
        }
        printf("\n");

        break;
      }
      pthread_mutex_unlock(&mut);  // 解锁
      close(clientSocketFd);
      return NULL;
    }
    // readLen > 0
    pthread_mutex_lock(&mut);  // 加锁
    printf("[DEBUG] fd = %d, msg = %s\n", clientSocketFd, buf);
    for (int i = 0; i < fdArrLen; i++) {
      write(fdArr[i], buf, readLen);
    }
    pthread_mutex_unlock(&mut);  // 解锁
  }
}

int main(int argc, char *argv[]) {
  if (argc != 2) {
    printf("Usage: %s <port>\n", argv[0]);
    exit(1);
  }

  int serverSocketFd = socket(PF_INET, SOCK_STREAM, IPPROTO_TCP);
  if (serverSocketFd == -1) {
    perror("Error created socket");
    exit(1);
  }

  struct sockaddr_in serverAddr = {0};
  serverAddr.sin_family = AF_INET;
  serverAddr.sin_addr.s_addr = htonl(INADDR_ANY);
  serverAddr.sin_port = htons(atoi(argv[1]));

  if (bind(serverSocketFd, (struct sockaddr *)&serverAddr,
           sizeof(serverAddr)) == -1) {
    perror("Error bound IP addr and port");
  }

  if (listen(serverSocketFd, 3 /* 最大连接数 */) == -1) {
    printf("Error listened on 127.0.0.1:%d\n", ntohs(serverAddr.sin_port));
  }

  pthread_mutex_init(&mut, NULL);  // 创建互斥锁
  while (1) {
    struct sockaddr_in clientAddr = {0};
    socklen_t clientAddrLen = sizeof(clientAddr);

    int clientSocketFd =
        accept(serverSocketFd, (struct sockaddr *)&clientAddr, &clientAddrLen);
    if (clientSocketFd == -1) {
      perror("Error accepted connection");
      break;
    }

    pthread_mutex_lock(&mut);  // 加锁
    fdArr[fdArrLen++] = clientSocketFd;

    printf("[DEBUG] fdArr");
    for (int i = 0; i < fdArrLen; i++) {
      printf(" %d", fdArr[i]);
    }
    printf("\n");

    pthread_mutex_unlock(&mut);  // 解锁

    pthread_t threadId;
    pthread_create(&threadId, NULL, clientHandler,
                   &clientSocketFd);  // 创建子进程
    pthread_detach(threadId);  // 从主进程上分离子进程, 主进程不会阻塞,
                               // 可以继续 accept 接受客户端的连接请求
    printf("Connect client IP: %s\n", inet_ntoa(clientAddr.sin_addr));
  }
  close(serverSocketFd);
  return 0;
}