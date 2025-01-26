# ch05

调用 write 函数时, 向输出缓冲区写入数据; 调用 read 函数时, 从输入缓冲区读出数据

<img src="../assets/rw.png" alt="rw" style="zoom:50%;" />

TCP 套接字的 IO 缓冲

- IO 缓冲在创建套接字时自动分配
- IO 缓冲在每个 TCP 套接字中单独存在
- 断开 socket 连接后, 会继续读出输出缓冲区的数据
- 断开 socket 连接后, 会丢失输入缓冲区的数据

## TCP 三次握手建立连接

> HostA ==> `SYN = { seq: 1000, ack: unknown }` ==> HostB

`seq: 1000` HostA 当前发送 1000 号数据包给 HostB, 如果 HostB 正确接收, 请 HostB 响应 HostA 一个确认: 即请求 HostA 继续发送 1001 号数据包给 HostB (当前发送 1000 号数据包, 如果正确接收, 请回复我向您继续发送 1001 号数据包)

> HostA <== `SYN+ACK = { seq: 2000, ack: 1001 }` <== HostB

`seq: 2000` HostB 当前发送 2000 号数据包给 HostA, 如果 HostA 正确接收, 请 HostA 响应 HostB 一个确认: 即请求 HostB 继续发送 2001 号数据包给 HostA (当前发送 2000 号数据包, 如果正确接收, 请回复我向您继续发送 2001 号数据包)

`ack: 1001` HostB 正确接收 HostA 发送的 1000 号数据包, 请求 HostA 继续发送 1001 号数据包给 HostB, 即建立 HostA 到 HostB 的单向连接 (正确接收 1000 号数据包, 请继续发送 1001 号数据包)

> HostA ==> `ACK = { seq: 1001, ack: 2001 }` ==> HostB

`ack: 2001` HostA 正确接收 HostB 发送的 2000 号数据包, 请求 HostB 继续发送 2001 号数据包给 HostA, 即建立 HostB 到 HostA 的单向连接 (正确接收 2000 号数据, 请继续发送 2001 号数据包)

三次握手, 建立 HostB 与 HostA 的双向连接

- HostA ==> SYN ==> HostB
- HostA <== SYN+ACK <== HostB
- HostA ==> ACK ==> HostB

## TCP 数据交换

- HostA ==> `{ seq: 1200, count: 100 }` ==> HostB
- HostA <== `{ ack: 1300 }` <== HostB
- HostA ==> `{ seq: 1300, count: 100 }` == _Timeout! _ =>
- HostA ==> `{ seq: 1300, count: 100 }` ==> HostB
- HostA <== `{ ack: 1400 }` <== HostB

## TCP 四次挥手断开连接

- HostA ==> 请求断开单向连接 `FIN = { seq: 5000, ack: unknown }` ==> HostB
- HostA <== 发送剩余数据, 单向连接断开 `ACK = { seq: 7500, ack: 5001 }` <== HostB
- HostA <== 请求断开单向连接 `FIN = { seq: 7501, ack: 5001 }` <== HostB
- HostA ==> 发送剩余数据, 单向连接断开 `ACK = { seq: 5001, ack: 7502 }` ==> HostB
