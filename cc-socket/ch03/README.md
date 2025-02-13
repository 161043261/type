# ch03 地址族

## cc

- IPv4, Internet Protocol version 4 ==> 4 字节地址族
- IPv6, Internet Protocol version 6 ==> 16 字节地址族

### 表示 IPv4 地址的结构体

```c
struct in_addr {
    int_addr_t s_addr; // 32 位 IPv4 地址
}

struct sockaddr_in {
    sa_family_t sin_family;  // 地址族 Address Family
    uint16_t sin_port;       // 16 位 TCP/UDP 端口号
    struct in_addr sin_addr; // 32 位 IPv4 地址
    char sin_zero[8];        // 0 填充
}
```

#### 数据类型说明

| 数据类型    | 说明                                               | 头文件       |
| ----------- | -------------------------------------------------- | ------------ |
| int8_t      | signed 8-bit int (char)                            | sys/types.h  |
| uint8_t     | unsigned 8-bit int (unsigned char)                 | sys/types.h  |
| int16_t     | signed 16-bit int (short)                          | sys/types.h  |
| uint16_t    | unsigned 16-bit int (unsigned short)               | sys/types.h  |
| int32_t     | signed 32-bit int (int / long)                     | sys/types.h  |
| uint32_t    | unsigned 32-bit int (unsigned int / unsigned long) | sys/types.h  |
| sa_family_t | 地址族 address family                              | sys/socket.h |
| socketlen_t | 结构体 sockaddr_in 长度                            | sys/socket.h |
| in_addr_t   | IP 地址, 等价于 uint32_t                           | netinet/in.h |
| in_port_t   | 端口, 等价于 uint16_t                              | netinet/in.h |

#### 结构体 sockaddr_in 成员说明

| 地址族   | 说明        |
| -------- | ----------- |
| AF_IET   | IPv4 地址族 |
| AF_INET6 | IPv6 地址族 |

- sin*port: 以 *网络字节序\_ 保存 16 位端口号
- sin*addr: 以 *网络字节序\_ 保存 32 位 IP 地址
- sin_zero: 0 填充

### 字节序 Endian

#### cpu 字节序 (主机字节序)

- 大端序 Big Endian - 高位字节存放到低位地址
- 小端序 Little Endian - 高位字节存放到高位地址

例: 整数 0x12345678 的大端序; 小端序表示

```text
大端序 Big Endian

  0x20   0x21   0x22   0x23
*------*------*------*------*
| 0x12 | 0x34 | 0x56 | 0x78 |
*------*------*------*------*

小端序 Little Endian

  0x20   0x21   0x22   0x23
*------*------*------*------*
| 0x78 | 0x56 | 0x34 | 0x12 |
*------*------*------*------*
```

#### 网络字节序

网络字节序: 大端序

#### 字节序转换

字节序转换的 api

```c
unsigned short htons(unsigned short); // 主机字节序 host endian ==> 网络字节序 net  endian
unsigned short ntohs(unsigned short); // 主机字节序 net  endian ==> 网络字节序 host endian
unsigned long htonl(unsigned long);   // 主机字节序 host endian ==> 网络字节序 net  endian
unsigned long ntohl(unsigned long);   // 主机字节序 net  endian ==> 网络字节序 host endian
```

代码

```c
sockaddr_in serverAddr{};
serverAddr.sin_family = AF_INET; // IPv4 协议族
// htonl 函数将一个 32 位 (4 字节) 的 int 整数从主机字节序转换为网络字节序
serverAddr.sin_addr.s_addr = htonl(INADDR_ANY); // 0.0.0.0 接受所有 IP 地址的 TCP/UDP 连接
// htons 函数将一个 16 位 (2 字节) 的 short 整数从主机字节序转换为网络字节序
serverAddr.sin_port = htons(atoi(argv[1])); // 端口 = 第 1 个命令行参数
```

#### 判断本机字节序

X86, ARM 都是小端序

```go
func IsLittleEndian() bool {
    var tester int32 = 1
    // 大端序 0x00_00_00_01
    // 小端序 0x01_00_00_00
    pointer := unsafe.Pointer(&tester)
    pb := (*byte)(pointer)
    return *pb != 1
}
```

### 网络地址的初始化与分配

inet_addr 函数: IP 字符串 `8.8.8.8` ==> 网络字节序的 32 位 unsigned long 整数 `0x8080808`

```c
#include <arpa/inet.h>
// 转换成功时, 返回 32 位大端序整数值
// 转换失败时, 返回 INADDR_NONE
in_addr_t inet_addr(const char *ipString); // in_addr_t 等价于 uint32_t
```

inet_aton 函数: 功能与 inet_addr 函数相同

```c
#include <arpa/inet.h>
// 转换成功时, 返回 1
// 转换失败时, 返回 0
// struct in_addr { int_addr_t s_addr;/* 32 位 IPv4 地址 */}
int inet_aton(const char* ipString, struct in_addr* inAddr);
```

#### 最佳实践

```c
sockaddr_in addr{};
std::string ipStr = "127.0.0.1";
int portNum = 3333;
addr.sin_family = AF_INET; // IPv4 地址族
// 调用 htonl 函数, IP 字符串 ==> 网络字节序 (小端序) 的整数
addr.sin_addr.s_addr/* 32 bits */ = inet_addr(ipStr); // 设置 32 位 IP 地址
// 调用 htons 函数, 主机字节序 (大端序)  ==> 网络字节序 (小端序)
addr.sin_port/* 16 bits */ = htons(portNum); // 设置 16 位 端口
```

## test

```shell
cd build
./ch03_test_inet

cd build/go
./ch03_test_endian
```
