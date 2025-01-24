# Network

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
client ----- handshake1 ----> server
       ====> SYN1 = 1   ====> # C => S 请求同步
       ====> seq1       ====>

client <---- handshake2 <--------- server
       <==== ACK1 = 1        <==== # 确认 SYN1, C => S 同步
       <==== SYN2 = 1        <==== # S => C 请求同步
       <==== ack1 = seq1 + 1 <==== # 确认收到 seq1
       <==== seq2            <====

client ----- handshake3 ---------> server
       ====> ACK2 = 1        ====> # 确认 SYN2, S => C 同步
       ====> ack2 = seq2 + 1 ====> # 确认收到 seq2
```

### 四次挥手

```shell
client ----- handshake1 ----> server
       ====> FIN1 = 1   ====> # C => S 请求终止
       ====> seq1       ====>

FIN_WAIT_1

client <---- handshake2 <--------- server
       <==== ACK1 = 1        <==== # 第 1 次确认 FIN1
       <==== ack1 = seq1 + 1 <==== # 确认收到 seq1

FIN_WAIT_2 服务器发送剩余数据

client <---- handshake3 <--------- server
       <==== ACK1 = 1        <==== # 第 2 次确认 FIN1, C => S 终止
       <==== FIN2 = 1        <==== # S => C 请求终止
       <==== ack1 = seq1 + 1 <==== # 确认收到 seq1
       <==== seq2            <====

TIME_WAIT 客户端发送剩余数据, 持续 2MSL
# MSL, Maximum Segment Lifetime 最长报文段寿命, 大约 1-4 分钟

client ----- handshake4 ---------> server
       ====> ACK2 = 1        ====> # 确认 FIN2, S => C 终止
       ====> ack2 = seq2 + 1 ====> # 确认收到 seq2
```

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
6. 将 HTML 文件解析为 DOM 树 (DOM, Document Object Model)
7. 将 CSS 文件解析为 CSSOM 树 (CSSOM, CSS Object Model)
8. 将 DOM 树和 CSSOM 树合并为渲染树 (Render Tree)

DNS 查询顺序

1. 浏览器 DNS 有没有? 有则 return
2. 操作系统 DNS 有没有? 有则 return
3. 本机 /etc/hosts 文件中有没有? 有则 return
4. 向域名服务器发送 DNS 查询请求

迭代查询

本地域名服务器 ====> 根域名服务器 .root-servers.net
本地域名服务器 ====> 顶级域名服务器 gtld-servers.net (Generic Top-Level)
本地域名服务器 ====> 权威域名服务器 ns1.alibabadns.com (或智能 DNS)

dns 迭代查询

```shell
dig +trace mihoyo.com
dig @8.8.8.8 stackoverflow.com
```

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

如果请求头中的 If-Modified-Since 字段值和服务器资源的最后修改时间 Last-Modified 值相等, 则服务器判断资源未更新, 返回 304 Not Modified, 响应体为空; 如果服务器资源的最后修改时间 Last-Modified **晚于**请求头中的 If-Modified-Since 字段值, 则服务器判断资源已更新, 返回 200 OK, 响应体中携带更新的资源

- If-None-Match: "hash_code_or_version_or..."
- ETag: "hash_code_or_version_or..."

如果请求头中的 If-None-Match 字段值和服务器资源的 ETag 值相等, 则服务器判断资源未更新, 返回 304 Not Modified, 响应体为空; 如果请求头中的 If-Modified-Since 字段值和服务器资源的 ETag 值不相等, 则服务器判断资源已更新, 返回 200 OK, 响应体中携带更新的资源

### 回流和重绘

回流也称为重排

回流 (Reflow) 是指元素的尺寸, 位置等改变时 (例如 weight, height, font-size) 渲染引擎重新计算**整个**页面布局, 回流后一定有重绘, 性能影响较大

重绘 (Repaint) 是指元素的样式等改变时 (例如 color, background-color), 渲染引擎重新绘制**部分**元素, 重绘前不一定有回流, 性能影响较小

会导致回流的操作

1. 页面首次渲染
2. 浏览器窗口 (视口 vw, vh) 尺寸改变
3. 元素尺寸 (weight, height, margin, padding, ...) 或位置 (left, top, ...) 改变
4. 元素字体大小改变
5. 添加或删除可见的 DOM 元素
6. 激活 CSS 伪类 (例如 :hover)

### CDN, Content Delivery Network

CDN 内容分发网络, 用于优化资源请求时间

## 跨域

**同源策略**

- 同源: 主机 (域名), 端口, 协议都相同
- 跨域
  1. 主机 (域名) 不同
  2. 端口不同: 80, 8080
  3. 协议不同: http, https

**跨域的解决**

1. 前后端协商 jsonp
2. 前端解决: 使用代理, 只在开发环境中使用
3. 后端解决: 设置请求头
4. 使用 nginx 代理

**前后端协商 jsonp**: script 标签的 src 不受同源策略的限制, 可以发送跨域请求, 但只能发送 GET 请求

```shell
pnpm i express @types/express
```

**前端解决**: 使用代理, 只在开发环境中使用

```shell
pnpm i vite -D # webpack
vim /path/to/ts-playground/vite.config.ts
```

vite.config.ts

```ts
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
});
```

修改 package.json

```json
{
  "scripts": {
    "dev": "vite"
  }
}
```

**后端解决**

```ts
app.get("/api/json", (_req, resp) => {
  // 允许任何主机 (域名), 端口, 协议的请求
  // resp.setHeader("Access-Control-Allow-Origin", "*");
  resp.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  resp.json({ name: "express" });
});
```

**使用 nginx 代理**

```shell
sudo apt install nginx
sudo vim /etc/nginx/sites-available/default
```

/etc/nginx/sites-available/default

```js
server {
  location /api {
    proxy_pass http://127.0.0.1:3000;
  }
}
```

### AJAX

AJAX: Asynchronous JavaScript And XML

1. AJAX 向服务器发送请求并获取数据, 而无需刷新整个页面, 减少请求次数, 减少响应数据量, 减少网络带宽的消耗, 减轻服务器压力, 实现异步, 增量式更新页面
2. AJAX 对 SEO 搜索引擎优化劣势较大, 可能有网络安全问题

核心 API

1. 创建 xhr 实例 `const xhr = new XMLHttpRequest();`
2. open 方法: 初始化请求, 指定请求方法, 请求 URL, 是否异步 (默认 true)
3. send 方法: 发送请求
4. onreadystatechange: readyState 改变时, 调用的回调函数

- readyState 0: 已创建 xhr 实例, 未调用 open 方法
- readyState 1: 已调用 open 方法, 未调用 send 方法
- readyState 2: 已调用 send 方法, 已收到服务器返回的响应头
- readyState 3: 正在接收服务返回的数据
- readyState 4: 已收到服务器返回的全部数据

xhr 发送 GET 请求

```js
const xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:3000/api/json");
xhr.onload = function () {
  if (xhr.status === 200) {
    console.log(xhr.responseText);
  } else {
    console.log(xhr.status);
  }
};
xhr.send(/* params */);
```

### fetch

fetch 默认只支持 GET 和 POST 请求方法

- text() 将响应体解析为文本字符串
- json() 将响应体解析为 JSON 并返回一个 JS 对象
- blob() 将响应体解析为二进制数据, 并返回一个 Blob 对象
- arrayBuffer() 将响应体解析为二进制数据, 并返回一个 ArrayBuffer 对象
- formData() 将响应体解析为 FormData 对象

```js
fetch("http://localhost:3000/api/json")
  .then((resp) => resp.text())
  .then((resp) => {
    console.log(resp);
  });
```

### SSE, WebSocket

SSE, Server-Sent Events, 也称为事件流 Event Stream, 基于 HTTP, 利用 HTTP 的长连接特性, 在客户端和服务器间建立持久连接, 实现服务器向客户端实现服务器向客户端的实时数据推送

WebSocket 基于握手协议 (Handshake Protocol), 使用 HTTP/HTTPS 握手以建立连接, 建立连接后, 在 TCP 连接上进行全双工通信. 在客户端和服务器间建立持久连接, 实现客户端和服务器间的实时, **全双工**通信

```shell
pnpm i ws
pnpm i @types/ws -D
```

SSE, Server-Sent Events 和 WebSocket 都减少了不必要的请求, 可以实现服务器向客户端的实时数据推送, 不同点:

1. SSE 基于 HTTP, 利用 HTTP 的长连接特性, 在客户端和服务器间建立持久连接; WebSocket 基于 TCP
2. SSE 可以传输 text 文本字符串和 blob 二进制数据, 只支持单向数据流, 即只支持服务器向客户端推送数据; WebSocket 支持双向数据流, 没有消息大小限制
3. SSE 的 readyState:

- CONNECTING 正在建立连接
- OPEN 已建立连接, 正在接收服务器推送的数据
- CLOSED 已关闭连接
  SSE 不能手动关闭或重新连接; WebSocket 可以手动开启, 关闭, 重新连接等

4. SSE 基于 HTTP, 没有 SSL/TLS 加密, 不安全; WebSocket 有 SSL/TLS 加密, 安全

### navigator.sendBeacon

使用 navigator.sendBeacon 实现高效的数据上报

传统的数据上报, 例如 xhr, XMLHttpRequest 或 fetch, 页面卸载时可能丢失数据; navigator.sendBeacon 不受页面卸载的影响, 异步数据上报, 可以发送跨域请求

- navigator.sendBeacon 只能发送 POST 请求
- 不能自定义请求头
- 只能传输少量数据 (<= 64KB)
- 只能传输 ArrayBuffer, ArrayBufferView, Blob, DOMString, FormData 或 URLSearchParams 类型的数据

```js
navigator.sendBeacon("http://localhost:3000/api/beacon");
```

### TLS, SSL

TLS (Transport Layer Security) 和 SSL (Secure Sockets Layer) 提供加密和认证机制, 确保数据传输的隐私

- 对称加密: 密钥加密, 密钥解密, 例: AES
- 非对称加密: 公钥加密, 私钥解密, 例: RSA, 发送方使用接收方的公钥加密数据, 接收方收到加密数据后使用私钥解密

### JWT, JSON Web Token

```shell
pnpm i jsonwebtoken cors @types/jsonwebtoken @types/cors
```

1. 使用 online/offline 事件监听器, 监听网络连接状态的改变: 在线/离线
2. 使用 navigator.onLine 属性, 获取当前的网络连接状态

```js
// 使用 online/offline 事件监听器
window.addEventListener("online", () => {
  console.log("online");
});

window.addEventListener("offline", () => {
  console.log("offline");
});

// 使用 navigator.onLine 属性
if (navigator.onLine) {
  console.log("Online");
} else {
  console.log("Offline");
}
```

```js
if ("connection" in navigator) {
  const networkInfo = navigator.connection;
  // 当前网络连接的下载速率, 单位 Mbps
  console.log("Network downlink:", networkInfo.downlink);
  // 当前网络连接的类型: slow-2g, 2g, 3g, 4g
  console.log("Network effective type:", networkInfo.effectiveType);
  // 当前网络连接的 rtt, 单位 ms
  console.log("Network round-trip time:", networkInfo.rtt);
  // 是否处于数据节省模式
  console.log("Network data-saving mode:", networkInfo.saveData);
} else {
  console.log("navigator.connection is not supported.");
}
```

### XSS, Cross-site scripting 跨站脚本攻击

- 反射型 XSS: 非持久型 XSS `http://127.0.0.1:5500/index.html?a=<script>alert(1)</script>`
- 存储型 XSS: 持久型 XSS, 会持久化存储, **最严重**
- DOM 型 XSS: 例如 document.write, eval, innerHTML, location, v-html

预防 XSS

- 输入过滤, 输出转义
- CSP, Content Security Policy 设置响应头的内容安全策略
