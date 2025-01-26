# ch14 多播和广播

## cc 多播 Multicast

多播基于 UDP

<img src="../assets/multicast.png" alt="multicast" style="zoom:50%;" />

- D 类 IP 地址 (多播地址) 224.0.0.0 ~ 239.255.255.255
- 加入多播组: 期望接收目的地址 224.0.0.1 的多播数据包
- 服务器多播数据包时, 支持多播的路由器复制该数据包并转发给多个主机
- TTL, Time to Live 数据包发送距离: 经过一个路由器 TTL--, TTL=0 时丢弃该数据包

服务器设置 TTL

```c
#define TTL 64
int udpSocketFd = socket(PF_INET, SOCK_DGRAM,  IPPROTO_UDP);

int timeToLive = TTL;
setsockopt(udpSocketFd, IPPROTO_IP, IP_MULTICAST_TTL, &timeToLive, sizeof(timeToLive));
```

服务器发送多播数据包

```c
sockaddr_in multicastAddr{};
multicastAddr.sin_family = AF_INET;                 // IPv4 协议族
multicastAddr.sin_addr.s_addr = inet_addr(multicastGroupIp); // multicastGroupIp
multicastAddr.sin_port = htonl(atoi(serverPort));   // serverPort
 // 将文件读入 buf
fgets(buf, BUF_SIZE, fp);
// 服务器发送多播数据包
sendto(udpSocketFd, buf, strlen(buf), 0, (sockaddr *)&multicastAddr, sizeof(multicastAddr));
```

加入多播组

```c
#define TTL 64
int udpSocketFd = socket(PF_INET, SOCK_DGRAM, IPPROTO_UDP);
// 多播组 IP 地址
clientAddr.imr_multiaddr.s_addr = inet_addr(multicastGroupIp);
// 0.0.0.0 接受所有 IP 地址的 TCP/UDP 连接
clientAddr.imr_interface.s_addr = htonl(INADDR_ANY);
setsockopt(udpSocketFd, IPPROTO_IP, IP_ADD_MEMBERSHIP, clientAddr, sizeof(timeToLive));
```

ip_mreq 结构体

```c
struct ip_mreq {
    struct in_addr imr_multiaddr; // 多播组 IP 地址
    struct in_addr imr_interface; // 加入多播组的主机 IP 地址
}
```

## cc 广播 Broadcast

- 多播 Multicast: 服务器可以发送数据包给不同网络号的多个主机
- 广播 Broadcast: 服务器只能发送数据包给相同网络号的所有主机

  - 直接广播: 主机号全 1 (192.168.0.255) 发送数据包给某个网络的所有主机
  - 本地广播: 网络号全 1, 主机号全 1 (255.255.255.255) 发送数据包给本地网络的所有主机

- 多播组 IP 地址: D 类 IP 地址
- 多播端口
  - 服务器多播 UDP 数据包到多播组中所有主机 (客户端) 的 3333 号端口
  - 客户端监听 3333 号端口
- 广播 IP 地址: 主机号全 1
- 广播端口
  - 服务器广播 UDP 数据包到网络中所有主机 (客户端) 的 3333 号端口
  - 客户端监听 3333 号端口

## test

```shell
cd build
./ch14_multicast_server 224.0.0.1 3333
./ch14_multicast_client 224.0.0.1 3333

./ch14_broadcast_server 255.255.255.255 3333
./ch14_broadcast_client 3333

cd build/go
./ch14_multicast_server 224.0.0.1:3333
./ch14_multicast_client 224.0.0.1:3333

./ch14_broadcast_server 255.255.255.255:3333
./ch14_broadcast_client :3333
```
