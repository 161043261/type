# ch08 DNS

DNS 是用于 IP 地址和 域名 (domain) 转换的系统

## cc

调用 gethostbyname 函数, 通过域名 domain 字符串获取主机信息 (IP 地址)

```c
#include <netdb.h>
// 成功时返回 hostent 结构体, 失败时返回 NULL 指针
struct hostent/* host entity */ *gethostbyname(const char *domain);
```

hostent 结构体

```c
struct hostent {
    char *h_name;     // 官方域名
    char **h_aliases; // 别名列表, 一个 IP 地址可以绑定多个域名
    int h_addrtype;   // IP 地址族, IPv4 (AF_INET) 或 IPv6 (AF_INET6)
    int h_length;     // IP 地址长度, IPv4: 4 字节, IPv6: 6 字节
    char **h_addr_list// IP 地址列表, 一个域名 也可以绑定多个 IP 地址
}
```

调用 gethostbyaddr 函数, 通过 IP 字符串获取主机信息 (域名字符串)

```c
#include <netdb.h>
/**
 * @param addr IP 地址
 * @param len IP 地址长度, IPv4: 4 字节, IPv6: 6 字节
 * @param family IP 地址族, IPv4 (AF_INET) 或 IPv6 (AF_INET6)
 */
struct hostent *gethostbyaddr(const void *addr, socklen_t len, int family);
```

## go

net.LookupHost 通过域名获取 IP 地址

```go
import "net"
func net.LookupHost(domain/* host */ string) (addrs []string, err error);
```

net.LookupAddr 通过 IP 地址获取域名

```go
import "net"
func net.LookupAddr(addr/* addrStr */ string) (hosts []string, err error);
```

## test

```shell
cd build
./ch08_test_gethostbyname www.google.com
./ch08_test_gethostbyaddr 8.8.8.8

cd build/go
./ch08_test_lookup www.google.com 8.8.8.8
```
