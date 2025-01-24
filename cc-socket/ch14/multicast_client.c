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
    printf("Usage : %s <multicastGroupIp> <multicastPort>\n", argv[0]);
    exit(0);
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

  struct sockaddr_in clientAddr = {0};
  clientAddr.sin_family = AF_INET;  // IPv4 协议族
  clientAddr.sin_addr.s_addr =
      htonl(INADDR_ANY);  //! 0.0.0.0 接受所有 IP 地址的 TCP/UDP 连接
  clientAddr.sin_port = htons(/* short */ atoi(multicastPort));
  socklen_t clientAddrLen = sizeof(clientAddr);

  int udpSocketFd = socket(PF_INET, SOCK_DGRAM, IPPROTO_UDP);
  if (bind(udpSocketFd, (struct sockaddr *)&clientAddr, clientAddrLen) == -1) {
    perror("[ERROR] Error bound multicast IP addr and port");
    exit(1);
  }

  struct ip_mreq multicastAddr = {0};
  multicastAddr.imr_multiaddr.s_addr =
      inet_addr(multicastGroupIp);  // 多播组 IP 地址
  multicastAddr.imr_interface.s_addr =
      htonl(INADDR_ANY);  //! 0.0.0.0 接受所有 IP 地址的 TCP/UDP 连接

  //! 加入多播组, 期望接收目的地址 224.0.0.1 的多播数据包
  setsockopt(udpSocketFd, IPPROTO_IP, IP_ADD_MEMBERSHIP, &multicastAddr,
             sizeof(multicastAddr));

  char buf[BUF_SIZE];
  while (1) {
    ssize_t recvBytes =
        recvfrom(udpSocketFd, buf, BUF_SIZE, 0, /* 可选参数, 置 0 */
                 NULL, NULL);
    if (recvBytes <= 0) {
      break;
    }
    buf[recvBytes] = '\0';
    printf("Multicast client receives: %s\n", buf);
  }
  close(udpSocketFd);
  return 0;
}