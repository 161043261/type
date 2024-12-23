=================================================

OSI

- 应用层
  - 应用层 HTTP, FTP, DNS
  - 表示层 JPEG, Crypto, Decrypto
  - 会话层 SSL, TLS
- 传输层 TCP, UDP
- 网络层 IP, ICMP, ARP, RIP

### 三次握手

1. seq (sequence number) 序列号, 随机生成
2. ack (acknowledgement number) 确认号, ack = seq + 1
3. ACK ACK = 1 确认
4. SYN (synchronous) SYN 默认 0, SYN = 1 表示请求同步连接
5. FIN (finish) FIN 默认 0, FIN = 1 表示请求终止连接

```shell
client ~~~~~ handshake1 ~~~~> server
       ====> SYN1 = 1   ====> # C => S 请求同步
       ====> seq1       ====>

client <~~~~ handshake2 <~~~~~~~~~ server
       <==== ACK1 = 1        <==== # 确认 SYN1, C => S 同步
       <==== SYN2 = 1        <==== # S => C 请求同步
       <==== ack1 = seq1 + 1 <==== # 确认收到 seq1
       <==== seq2            <====

client ~~~~~ handshake3 ~~~~~~~~~> server
       ====> ACK2 = 1        ====> # 确认 SYN2, S => C 同步
       ====> ack2 = seq2 + 1 ====> # 确认收到 seq2
```

### 四次挥手

```shell
client ~~~~~ handshake1 ~~~~> server
       ====> FIN1 = 1   ====> # C => S 请求终止
       ====> seq1       ====>

FIN_WAIT_1

client <~~~~ handshake2 <~~~~~~~~~ server
       <==== ACK1 = 1        <==== # 第 1 次确认 FIN1
       <==== ack1 = seq1 + 1 <==== # 确认收到 seq1

FIN_WAIT_2 服务器发送剩余数据

client <~~~~ handshake3 <~~~~~~~~~ server
       <==== ACK1 = 1        <==== # 第 2 次确认 FIN1, C => S 终止
       <==== FIN2 = 1        <==== # S => C 请求终止
       <==== ack1 = seq1 + 1 <==== # 确认收到 seq1
       <==== seq2            <====

TIME_WAIT 客户端发送剩余数据, 持续 2MSL
# MSL, Maximum Segment Lifetime 最长报文段寿命, 大约 1~4 分钟

client ~~~~~ handshake4 ~~~~~~~~~> server
       ====> ACK2 = 1        ====> # 确认 FIN2, S => C 终止
       ====> ack2 = seq2 + 1 ====> # 确认收到 seq2
```

=================================================

URL

```txt
协议 ://域名           /目录名 /文件名
https://www.example.com/path/to/index.html
```

输入 URL 后:

1. DNS 查询
2. TCP 三次握手
3. HTTP 请求/响应
4. 强缓存/协商缓存 (HTML, CSS, JS)
5. TCP 四次挥手
6. 将 HTML 文件解析为 DOM 树

=================================================

DNS 查询顺序

1. 浏览器 DNS 有没有? 有则 return
2. 操作系统 DNS 有没有? 有则 return
3. 本机 /etc/hosts 文件中有没有? 有则 return
4. 向域名服务器发送 DNS 查询请求

迭代查询

本地域名服务器 ====> 根域名服务器 .root-servers.net
本地域名服务器 ====> 顶级域名服务器 gtld-servers.net (Generic Top-Level)
本地域名服务器 ====> 权威域名服务器 ns1.alibabadns.com

dns 迭代查询

```shell
dig +trace mihoyo.com
dig @8.8.8.8 stackoverflow.com
```

=================================================

OPTIONS 预检请求

OPTIONS 请求称为预检请求 (pre-flight request), 属于 CORS 跨域资源共享机制, 浏览器

- 发送跨域请求
- 发送的实际请求中有自定义请求头

前, 会先发送一次 OPTIONS 预检请求, 询问服务器是否允许跨域, 允许哪些 HTTP 请求方法和请求头字段等, OPTIONS 预检请求的目的是确保实际请求对服务器是安全的, OPTIONS 预检请求包含以下请求头字段

1. Origin 发送请求的域名
2. Access-Control-Request-Method 实际请求将使用的 HTTP 请求方法
3. Access-Control-Request-Headers 实际请求将携带的请求头字段

服务器通过请求头告诉浏览器: 允许发送跨域请求的域名, 允许哪些 HTTP 请求方法和请求头字段等

1. Access-Control-Allow-Origin 允许发送跨域请求的域名
2. Access-Control-Allow-Methods 允许哪些 HTTP 请求方法
3. Access-Control-Allow-Headers 允许哪些 HTTP 请求头字段

=================================================

### 强缓存, 协商缓存

强缓存, 协商缓存: 浏览器会缓存服务器提供的资源

- 后续请求强缓存的资源, 不会请求服务器, 浏览器直接返回
- 后续请求协商缓存的资源, 仍会请求服务器, 资源未更新时服务器返回 304 Not Modified, 响应体为空; 资源已更新时服务器返回 200 OK, 响应体中携带更新的资源

> 服务器可以使用响应头中的 Cache-Control 或 Expires 字段设置强缓存, Expires 的优先级高于 Cache-Control

- Cache-Control: max-age=161043261
- Expires: Mon Jan 01 2025 04:32:51 GMT+0800 (GMT+8:00)

```js
// server.js
resp.setHeader("Expires", new Date(Date.now() + 1000 * 10));
resp.setHeader("Cache-Control", "max-age=10");
resp.end(file.toString());
```

- disk cache 磁盘缓存
- memory cache 内存缓存

```shell
Request Method: GET
Status Code: 200 (from disk cache) # 磁盘缓存
Remote Address: 127.0.0.1:3000
```

```shell
Request Method: GET
Status Code: 200 OK (from memory cache) # 内存缓存
Remore Address [::1]:3000
```

**协商缓存**

> If-None-Match/ETag 的优先级高于 If-Modified-Since/Last-Modified

- If-Modified-Since: Mon Jan 01 2025 04:32:51 GMT+0800 (GMT+8:00)
- Last-Modified: Mon Jan 01 2025 04:32:51 GMT+0800 (GMT+8:00)

如果请求头中的 If-Modified-Since 字段值和服务器资源的最后修改时间 Last-Modified 值相等, 则服务器判断资源未更新, 返回 304 Not Modified, 响应体为空; 如果服务器资源的最后修改时间 Last-Modified **晚于** 请求头中的 If-Modified-Since 字段值, 则服务器判断资源已更新, 返回 200 OK, 响应体中携带更新的资源

- If-None-Match: "hash_code_or_version_or..."
- ETag: "hash_code_or_version_or..."

如果请求头中的 If-None-Match 字段值和服务器资源的 ETag 值相等, 则服务器判断资源未更新, 返回 304 Not Modified, 响应体为空; 如果请求头中的 If-Modified-Since 字段值和服务器资源的 ETag 值不相等, 则服务器判断资源已更新, 返回 200 OK, 响应体中携带更新的资源
