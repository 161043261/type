# ch02 socket 函数

## cc

socket 函数

```c
#include <sys/socket.h>
int socket(int domain, int type, int protocol);
```

| arg0: domain | 协议族 Protocol Family | arg1: type  | 套接字类型                             | arg2: protocol | 协议 |
| ------------ | ---------------------- | ----------- | -------------------------------------- | -------------- | ---- |
| PF_INET      | IPv4 协议族            | SOCK_STREAM | 面向连接的套接字; 可靠; 有序的字节流   | IPPROTO_TCP    | TCP  |
| PF_INET6     | IPv6 协议族            | SOCK_DGRAM  | 面向消息的套接字; 不可靠, 失序的数据报 | IPPROTO_UDP    | UDP  |

创建 TCP 套接字

```c
int tcp_socket = socket(PF_INET, SOCK_STREAM, IPPROTO_TCP /* 0 */);
```

创建 UDP 套接字

```c
int udp_socket = socket(PT_INET, SOCK_DGRAM, IPPROTO_UDP);
```

## go

```go
import "net"

/**
 * @param net 网络协议, 例如 tcp, udp
 * @param localAddr 本机 IP 地址和端口
*/
func Listen(net, localAddr string) (Listener, error)
// 创建tcp套接字
listener, err := net.Listen("tcp" /* also tcp4 */, "127.0.0.1:3333")
// 创建udp套接字
listener, err := net.Listen("udp" /* also udp4 */, "127.0.0.1:3333")
```

## test

```shell
cd build
./ch02_tcp_server 3333
./ch02_tcp_client 127.0.0.1 3333

cd build/go
./ch02_tcp_server :3333
./ch02_tcp_client 127.0.0.1:3333
```
