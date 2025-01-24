//
// Created by Tiancheng on 2024/8/18.
//

#include <arpa/inet.h>
#include <netinet/tcp.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/socket.h>

int main(/* int argc, char *argv[] */) {
  int tcpSocketFd = socket(PF_INET, SOCK_STREAM, IPPROTO_TCP);
  int udpSocketFd = socket(PF_INET, SOCK_DGRAM, IPPROTO_UDP);
  printf("TCP socket fd: %d\n", tcpSocketFd);  //! TCP socket fd: 3
  printf("UDP socket fd: %d\n", udpSocketFd);  //! UDP socket fd: 4

  int optVal, err;
  socklen_t optLen = sizeof(optVal);

  //? get 套接字类型 (TCP)
  err /* 成功时返回 0, 失败时返回 -1 */ =
      getsockopt(tcpSocketFd,  // socketFd 套接字文件描述符
                 SOL_SOCKET,   // level 协议层
                 SO_TYPE,      // optName 选项名
                 &optVal,      // optVal 接收选项值
                 &optLen);     // optLen 接收选项长度
  if (err == -1) {
    fputs("Error revoked getsockopt\n", stderr);
    exit(1);
  }
  printf("TCP socket type: %d\n", optVal);  //! TCP socket type: 1

  //? get 套接字类型 (UDP)
  err = getsockopt(udpSocketFd, SOL_SOCKET, SO_TYPE, &optVal, &optLen);
  if (err == -1) {
    fputs("Error revoked getsockopt\n", stderr);
    exit(1);
  }
  printf("UDP socket type: %d\n", optVal);  //! UDP socket type: 2

  //? get 接收缓冲区大小
  err = getsockopt(tcpSocketFd, SOL_SOCKET, SO_RCVBUF, &optVal, &optLen);
  if (err == -1) {
    fputs("Error revoked getsockopt\n", stderr);
    exit(1);
  }
  printf("Recv buffer size: %d\n", optVal);  //! Recv buffer size: 131072

  //? get 发送缓冲区大小
  err = getsockopt(tcpSocketFd, SOL_SOCKET, SO_SNDBUF, &optVal, &optLen);
  if (err == -1) {
    fputs("Error revoked getsockopt\n", stderr);
    exit(1);
  }
  printf("Send buffer size: %d\n", optVal);  //! Send buffer size: 16384

  //* set 接收缓冲区大小
  int rcvBuf /* optVal */ = 3 * 1024;
  err /* 成功时返回 0, 失败时返回 -1 */ =
      setsockopt(tcpSocketFd,      // socketFd 套接字文件描述符
                 SOL_SOCKET,       // level 协议层
                 SO_RCVBUF,        // optName 选项名
                 &rcvBuf,          // optVal 接收选项值
                 sizeof(rcvBuf));  // optLen 接收选项长度
  if (err == -1) {
    fputs("Error revoked setsockopt\n", stderr);
    exit(1);
  }
  getsockopt(tcpSocketFd, SOL_SOCKET, SO_RCVBUF, &optVal, &optLen);
  printf("Update recv buffer size: %d\n",
         optVal);  //! Update recv buffer size: 6144

  //* set 发送缓冲区大小
  int sndBuf /* optVal */ = 3 * 1024;
  err = setsockopt(tcpSocketFd, SOL_SOCKET, SO_SNDBUF, &sndBuf, sizeof(sndBuf));
  if (err == -1) {
    fputs("Error revoked setsockopt\n", stderr);
    exit(1);
  }
  getsockopt(tcpSocketFd, SOL_SOCKET, SO_SNDBUF, &optVal, &optLen);
  printf("Update send buffer size: %d\n",
         optVal);  //! Update send buffer size: 6144

  //! 查看 Nagle 算法是否禁用
  getsockopt(tcpSocketFd, IPPROTO_TCP, TCP_NODELAY,
             &optVal /* 0 启用, 1 禁用 */, &optLen);
  printf("Nagle: %d\n", optVal);  // Nagle: 0
  //! 禁用 Nagle 算法
  int shutdown = 1;
  setsockopt(tcpSocketFd, IPPROTO_TCP, TCP_NODELAY, &shutdown,
             sizeof(shutdown));
  //! 查看 Nagle 算法是否禁用
  getsockopt(tcpSocketFd, IPPROTO_TCP, TCP_NODELAY,
             &optVal /* 0 启用, 1 禁用 */, &optLen);
  printf("Nagle: %d\n", optVal);  // Nagle: 1
  return 0;
}
