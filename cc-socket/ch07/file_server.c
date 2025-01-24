//
// Created by Tiancheng on 2024/8/18.
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

  //* 调用 socket 函数, 服务器创建 listener
  int serverSocketFd = socket(PF_INET, SOCK_STREAM, IPPROTO_TCP);

  struct sockaddr_in serverAddr = {0};
  serverAddr.sin_family = AF_INET;  // IPv4 协议族
  // htonl 函数将一个 32 位 (4 字节) 的 int 整数从主机字节序转换为网络字节序
  serverAddr.sin_addr.s_addr =
      htonl(INADDR_ANY);  // 0.0.0.0 接受所有 IP 地址的 TCP/UDP 连接
  // htons 函数将一个 16 位 (2 字节) 的 short 整数从主机字节序转换为网络字节序
  serverAddr.sin_port = htons(atoi(argv[1]));  // 端口 = 第 1 个命令行参数
  //* 调用 bind 函数, 给 socket 套接字分配 IP 地址和端口
  bind(serverSocketFd, (struct sockaddr *)&serverAddr, sizeof(serverAddr));
  //* 调用 listen 函数, 监听客户端的连接请求
  listen(serverSocketFd, 3 /* 最大连接数 */);

  struct sockaddr_in clientAddr = {0};
  socklen_t clientAddrLen = sizeof(clientAddr);
  int clientSocketFd =
      accept(serverSocketFd, (struct sockaddr *)&clientAddr, &clientAddrLen);

  if (clientSocketFd == -1) {
    perror("Error accepted connection");
    exit(1);
  }

  char send[BUF_SIZE];
  char recv[BUF_SIZE];
  FILE *readmeMd /* 文件 IO 流 */ = fopen("../README.md", "rb");
  while (1) {
    int byteCount =
        /**
         * @param buf           将 ../readme.md 文件读出到 buf 缓冲区
         * @param elemSize      = 1 (byte), 元素大小
         * @param elemNum       = (BUF_SIZE /
         * elemSize), 期望读出的元素个数 (即期望读出的字节数)
         * @param fileStream    ../readme.md 文件 IO 流
         * @return byteCount    实际读出的元素个数 (即实际读出的字节数)
         */
        fread(send /* buf */, 1 /* elemSize */, (BUF_SIZE / 1) /* elemNum */,
              readmeMd /* fileStream */);
    if (byteCount < BUF_SIZE) {
      //! 从 send 缓冲区中读出 byteCount 个字节, 写入 clientSocketFd
      write(clientSocketFd, send, byteCount);
      break;  //* 读出的字节数小于缓冲区大小, byteCount < BUF_SIZE; break;
    }
    // TCP 输出流
    write(clientSocketFd, send,
          BUF_SIZE);  //* 读出字节数等于缓冲区大小 byteCount == BUF_SIZE;
                      // continue;
  }
  fclose(readmeMd);                   //* 关闭文件 IO 流
  shutdown(clientSocketFd, SHUT_WR);  //* 断开输出流, 向服务器发送 EOF

  // TCP 输入流
  read(clientSocketFd, recv,
       BUF_SIZE);  //* 输出流断开, 输入流未断开
  printf("Message from client: %s\n", recv);
  close(clientSocketFd);  //* 断开服务器与客户端的连接
  close(serverSocketFd);  //* 服务器关闭 listener
  return 0;
}
