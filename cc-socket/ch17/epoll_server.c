//
// Created by Tiancheng on 2024/8/30.
//

#include <arpa/inet.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/epoll.h>
#include <sys/socket.h>
#include <unistd.h>

#define BUF_SIZE 3
#define EPOLL_SIZE 50

// 连接的建立和关闭: 离散事件, 使用水平触发 (默认)
//* epollEvent.events = EPOLLIN;
// 传输流式数据: 流式事件, 使用边沿触发
//* epollEvent.events = EPOLLIN | EPOLLET;

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

  // 调用 bind 函数, 给 socket 套接字分配 IP 地址和端口
  if (bind(serverSocketFd, (struct sockaddr *)&serverAddr,
           sizeof(serverAddr)) ==
      -1 /* 绑定 IP 地址; 端口, 成功时返回 0, 失败时返回 -1 */) {
    perror("Error bound IP addr and port");
    exit(0);
  }

  // 调用 listen 函数, 监听客户端的连接请求
  if (listen(serverSocketFd, 3 /* 最大连接数 */) == -1) {
    printf("Error listened on 127.0.0.1:%d\n", ntohs(serverAddr.sin_port));
    exit(1);
  }

  //! epoll_create 函数
  //! 创建 epoll 实例 epollInstance, 返回 epollInstance 的文件描述符
  int epollInstanceFd = epoll_create(EPOLL_SIZE);

  //! 定义 epollEvent 事件: serverSocketFd 可读
  //! 触发方式: 边沿触发
  struct epoll_event epollEvent = {0};
  epollEvent.events = EPOLLIN | EPOLLET;  // 文件描述符 serverSocketFd 可读
  epollEvent.data.fd = serverSocketFd;

  //! epoll_ctl 函数
  //! 向 epoll 实例 epollInstance 中添加 epollEvent 事件
  //? serverSocketFd 从不可读到可读时触发
  epoll_ctl(epollInstanceFd, EPOLL_CTL_ADD, serverSocketFd, &epollEvent);

  //! 创建监听事件数组 eventArr
  struct epoll_event eventArr[EPOLL_SIZE];
  char buf[BUF_SIZE];

  int cnt = 0;

  while (1) {
    //! epoll_wait 函数
    //! 等待已添加事件发生或超时
    int triggeredEventIdx =
        epoll_wait(epollInstanceFd, eventArr, EPOLL_SIZE, -1 /* 不会超时 */);
    if (triggeredEventIdx == -1) {
      perror("[ERROR] Fatal error");
      break;
    }

    printf("Loop count = %d\n", ++cnt);

    for (int i = 0; i < triggeredEventIdx; i++) {
      //! serverSocketFd 从不可读到可读, 即收到客户端的连接请求
      if (eventArr[i].data.fd == serverSocketFd) {
        //* 是 serverSocketFd
        struct sockaddr_in clientAddr = {0};
        socklen_t clientAddrLen = sizeof(clientAddr);

        int clientSocketFd = accept(
            serverSocketFd, (struct sockaddr *)&clientAddr, &clientAddrLen);
        if (clientSocketFd == -1) {
          perror("Error accepted connection");
          exit(1);
        }

        printf("[INFO] Client socket fd %d connected\n", clientSocketFd);

        //! 定义 cliEpollEvent 事件: clientSocketFd 可读
        //! 触发方式: 水平触发
        struct epoll_event cliEpollEvent = {0};
        cliEpollEvent.events = EPOLLIN;  // clientSocketFd 可读

        //// 定义 cliEpollEvent 事件: clientSocketFd 可读
        //// 触发方式: 水平触发
        //// cliEpollEvent.events =
        ////     EPOLLIN | EPOLLET; // 文件描述符 clientSocketFd 可读

        cliEpollEvent.data.fd = clientSocketFd;

        //! epoll_ctl 函数
        //! 向 epoll 实例 epollInstance 中添加 cliEpollEvent 事件
        //! clientSocketFd 可读时触发
        epoll_ctl(epollInstanceFd, EPOLL_CTL_ADD, clientSocketFd, &epollEvent);
      } else {
        //* 是 clientSocketFd
        //! clientSocketFd 可读, 即收到客户端发送的数据
        int readableClientSocketFd = eventArr[i].data.fd;
        int readBytes = read(readableClientSocketFd, buf, BUF_SIZE);
        if (readBytes <= 0) {
          //! epoll_ctl 函数
          //! 从 epoll 实例 epollInstance 中删除
          //! readableClientSocketFd
          epoll_ctl(epollInstanceFd, EPOLL_CTL_DEL, readableClientSocketFd,
                    NULL);
          close(readableClientSocketFd);
          printf("[INFO] Client socket fd %d disconnected\n",
                 readableClientSocketFd);
        } else {
          // echo
          write(readableClientSocketFd, buf, readBytes);
        }
      }
    }
  }
  close(serverSocketFd);
  close(epollInstanceFd);
  return 0;
}