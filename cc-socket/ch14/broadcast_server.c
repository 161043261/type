//
// Created by Tiancheng on 2024/8/28.
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
    printf("Usage: %s <broadcastIp> <broadcastPort>\n", argv[0]);
    exit(1);
  }

  //! 广播 IP 地址: 主机号全 1
  char *broadcastIp = argv[1];
  //! 广播端口
  //! 服务器广播 UDP 数据包到网络中所有主机 (客户端) 的 3333 号端口
  //! 客户端监听 3333 号端口
  char *broadcastPort = argv[2];

  int udpSocketFd = socket(PF_INET, SOCK_DGRAM, IPPROTO_UDP);
  struct sockaddr_in broadcastAddr = {0};
  broadcastAddr.sin_family = AF_INET;
  broadcastAddr.sin_addr.s_addr = inet_addr(broadcastIp);
  broadcastAddr.sin_port = htons(atoi(broadcastPort));

  //? optVal ? optLen ?
  int optVal = 1;
  int optLen = sizeof(optVal);

  setsockopt(udpSocketFd, SOL_SOCKET, SO_BROADCAST, &optVal, optLen);
  FILE *fp = fopen("../README.md", "r");
  if (fp == NULL) {
    perror("[ERROR] Open ../README.md error");
    exit(1);
  }

  char buf[BUF_SIZE];
  while (!feof(fp)) {
    //! 文件未结束时返回 false, 结束时返回 true
    fgets(buf, BUF_SIZE, fp);  // 将文件读入 buf
    //! 服务器广播 UDP 数据包
    sendto(udpSocketFd, buf, strlen(buf), 0, (struct sockaddr *)&broadcastAddr,
           sizeof(broadcastAddr));
    printf("Broadcast server sends: %s\n", buf);
    sleep(2);
  }
  fclose(fp);
  close(udpSocketFd);
  return 0;
}