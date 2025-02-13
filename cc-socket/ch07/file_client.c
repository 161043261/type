//
// Created by Tiancheng on 2024/8/18.
//

#include <arpa/inet.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <unistd.h>

#define BUF_SIZE 30

int main(int argc, char *argv[]) {
  if (argc != 3) {
    printf("Usage: %s <serverAddr> <serverPort>\n", argv[0]);
    exit(1);
  }
  //! 创建 ../README.txt 文件 IO 流
  FILE *readmeTxt /* 文件 IO 流 */ =
      fopen("../README.txt" /* filename */, "wb" /* modes */);
  //* 调用 socket 函数, 创建 TCP socket 套接字
  int clientSocketFd = socket(PF_INET, SOCK_STREAM, IPPROTO_TCP);

  struct sockaddr_in serverAddr = {0};
  serverAddr.sin_family = AF_INET;
  serverAddr.sin_addr.s_addr = inet_addr(argv[1]);
  serverAddr.sin_port = htons(atoi(argv[2]));

  //* 客户端调用 connect 函数, 向服务器发送连接请求
  connect(clientSocketFd, (struct sockaddr *)&serverAddr, sizeof(serverAddr));

  char recv[BUF_SIZE];
  while (1) {
    //! 从 clientSocketFd 中最多读出 BUF_SIZE 个字节, 写入 recv 缓冲区
    int readCnt =
        read(clientSocketFd /* fileDescriptor */, recv /* recv */, BUF_SIZE);
    if (readCnt <= 0) {
      break;
    }
    printf("Client reads: %s\n", recv);

    /**
     * @param buf           源 buf 缓冲区
     * @param elemSize      = 1 (byte), 元素大小
     * @param elemNum       = BUF_SIZE /
     * elemSize, 期望写入的元素个数 (即期望写入的字节数)
     * @param fileStream    目的 ../README.txt 文件 IO 流
     * @return byteCount    实际写入的元素个数 (即实际写入的字节数)
     */
    /* size_t byteCount = */ fwrite(recv /* buf */, 1 /* elemSize */,
                                    readCnt /* elemNum */,
                                    readmeTxt /* fileStream */);
  }
  fclose(readmeTxt);
  char send[BUF_SIZE] = "Thank you";
  // 服务器的输出流已断开
  write(clientSocketFd, send, strlen(send) + 1 /* strlen 不计算 '/0' */);
  close(clientSocketFd);
  return 0;
}
