//
// Created by Tiancheng on 2024/8/28.
//

#include <arpa/inet.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/socket.h>
#include <unistd.h>

#define BUF_SIZE 30

int main(int argc, char *argv[]) {
  if (argc != 2) {
    printf("Usage : %s <broadcastPort>\n", argv[0]);
    exit(0);
  }

  //! 广播端口
  //! 服务器广播 UDP 数据包到网络中所有主机 (客户端) 的 3333 号端口
  //! 客户端监听 3333 号端口
  char *broadcastPort = argv[1];

  struct sockaddr_in clientAddr = {0};
  clientAddr.sin_family = AF_INET;
  clientAddr.sin_addr.s_addr =
      htonl(INADDR_ANY);  //! 0.0.0.0 接受所有 IP 地址的 TCP/UDP 连接
  clientAddr.sin_port = htons(atoi(broadcastPort));
  socklen_t clientAddrLen = sizeof(clientAddr);

  int udpSocketFd = socket(AF_INET, SOCK_DGRAM, IPPROTO_UDP);
  if (bind(udpSocketFd, (struct sockaddr *)&clientAddr, clientAddrLen) == -1) {
    perror("[ERROR] Error bound broadcast IP addr and port");
    exit(1);
  }

  char buf[BUF_SIZE];
  while (1) {
    ssize_t recvBytes = recvfrom(udpSocketFd, buf, BUF_SIZE, 0, NULL, NULL);
    if (recvBytes <= 0) {
      break;
    }
    buf[recvBytes] = '\0';
    printf("Broadcast client receives: %s\n", buf);
  }
  close(udpSocketFd);
  return 0;
}