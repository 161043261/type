//
// Created by Tiancheng on 2024/8/28.
//

#include <arpa/inet.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <unistd.h>

#define TTL 64
#define BUF_SIZE 30

int main(int argc, char *argv[]) {
  if (argc != 3) {
    printf("Usage: %s <multicastGroupIp> <multicastPort>\n", argv[0]);
    exit(1);
  }

  //! 多播组 IP 地址: D 类 IP 地址
  char *multicastGroupIp = argv[1];
  //! 多播端口
  //! 服务器多播 UDP 数据包到多播组中所有主机 (客户端) 的 3333 号端口
  //! 客户端监听 3333 号端口
  char *multicastPort = argv[2];
  if (strcmp("224.0.0.0", multicastGroupIp) >= 0 ||
      strcmp("239.255.255.255", multicastGroupIp) <= 0) {
    perror("[ERROR] Multicast multicastGroupIp error");
    exit(1);
  }

  int udpSocketFd = socket(PF_INET, SOCK_DGRAM, IPPROTO_UDP);

  struct sockaddr_in multicastAddr = {0};
  multicastAddr.sin_family = AF_INET;  // IPv4 协议族
  multicastAddr.sin_addr.s_addr =
      inet_addr(multicastGroupIp);  //! 多播组 IP 地址: D 类 IP 地址
  //! 多播端口
  //! 服务器多播 UDP 数据包到多播组中所有主机 (客户端) 的 3333 号端口
  //! 客户端监听 3333 号端口
  multicastAddr.sin_port = htons(/* short */ atoi(multicastPort));

  int timeToLive = TTL;
  setsockopt(udpSocketFd, IPPROTO_IP, IP_MULTICAST_TTL, &timeToLive,
             sizeof(timeToLive));

  FILE *fp = fopen("../README.md", "r");
  if (fp == NULL) {
    perror("[ERROR] Open ../README.md error");
    exit(1);
  }

  char buf[BUF_SIZE];
  while (!feof(fp)) {
    //! 文件未结束时返回 false, 结束时返回 true
    fgets(buf, BUF_SIZE, fp);  // 将文件读入 buf
    //! 服务器多播 UDP 数据包
    sendto(udpSocketFd, buf, strlen(buf), 0, (struct sockaddr *)&multicastAddr,
           sizeof(multicastAddr));
    printf("Multicast server sends: %s\n", buf);
    sleep(2);
  }
  fclose(fp);
  close(udpSocketFd);
  return 0;
}