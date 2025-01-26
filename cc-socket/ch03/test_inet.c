//
// Created by Tiancheng on 2024/8/17.
//

#include <arpa/inet.h>
#include <stdio.h>

int main() {
  char ipStrA[] = "1.2.3.4";
  char ipStrB[] = "1.2.3.256";

  unsigned long uintIpA = inet_addr(ipStrA);

  //* test func inet_addr
  if (uintIpA == INADDR_NONE) {
    printf("ipStrA error\n");
  } else {
    printf("ipStrA = %#lx\n", uintIpA);  // ipStrA = 0x8080808
  }

  unsigned long uintIpB = inet_addr(ipStrB);
  if (uintIpB == INADDR_NONE) {
    printf("ipStrB error\n");  // ipStrB error
  } else {
    printf("ipStrB = %#lx\n", uintIpB);
  }

  /**
   * struct in_addr {
   *     int_addr_t s_addr; // 32 位 IPv4 地址
   * }
   *
   * struct sockaddr_in {
   *     sa_family_t sin_family;  // 地址族 Address Family
   *     uint16_t sin_port;       // 16 位 TCP/UDP 端口号
   *     struct in_addr sin_addr; // 32 位 IPv4 地址
   *     char sin_zero[8];        // 0 填充
   * }
   */
  struct sockaddr_in sockAddrInA = {0};
  if (inet_aton(ipStrA, &sockAddrInA.sin_addr) == 0 /* 0 as err, 1 as ok */) {
    printf("ipStrA error\n");
  } else {
    printf("ipStrA = %#x\n",
           inet_addr(ipStrA));  // ipStrA = 0x8080808
  }

  struct sockaddr_in sockAddrInB = {0};
  if (inet_aton(ipStrB, &sockAddrInB.sin_addr) == 0) {
    printf("ipStrB error\n");  // ipStrB error
  } else {
    printf("ipStrB = %#x\n", inet_addr(ipStrB));
  }

  return 0;
}
