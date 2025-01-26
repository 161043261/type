//
// Created by Tiancheng on 2024/8/18.
//

#include <arpa/inet.h>
#include <netdb.h>
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
  if (argc != 2) {
    printf("Usage: %s <addr>\n", argv[0]);
    exit(1);
  }
  char *addrStr = argv[1];
  //! 将 IP 地址字符串转换为网络字节序 (大端序) 的 unsigned int 类型的 IP 地址
  unsigned int addr = inet_addr(addrStr);
  //* addrStr: 8.8.8.8, addr: 134744072
  printf("addrStr: %s, addr: %d\n", addrStr, addr);
  struct hostent *host = gethostbyaddr(&addr, 4, AF_INET);
  //! error handler
  if (host == NULL) {
    fputs("Error gethostbyname", stderr);  // 向标准错误流中写入字符串
    fputc('\n', stderr);                   // 向标准错误流中写入字符
    exit(1);
  }
  printf("Name: %s\n", host->h_name);  // 官方域名
  for (int i = 0; host->h_aliases[i] != NULL; i++) {
    printf("Aliases %d: %s\n", i + 1, host->h_aliases[i]);  // 别名列表
  }
  printf("Address type: %s\n",
         host->h_addrtype == AF_INET ? "AF_INET" : "AF_INET6");  // IPv4 或 IPv6
  for (int i = 0; host->h_addr_list[i] != NULL; i++) {
    printf("IP addrs[%d]: %s\n", i,
           // inet_ntoa: 将网络字节序的 IP 地址转换为 IP 地址字符串
           inet_ntoa(*(struct in_addr *)host->h_addr_list[i]));  // IP 地址列表
  }
  return 0;
}
