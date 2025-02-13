# Web Workers

## 概述

Web Workers 允许主线程创建 worker 线程, 主线程负责 UI 事件, worker 线程负责计算密集型任务 (不允许操作 DOM), 页面会更加流畅, worker 线程创建后, 就会始终运行, 不会被主线程打断

Web Workers 有以下限制

1. 同源限制: worker 线程执行的脚本必须与主线程执行的脚本同源
2. worker 线程不允许操作 DOM, 不允许使用 document, window, parent 等对象, 但是可以使用 navigator 和 location 对象
3. worker 线程不允许调用 alert() 和 confirm 方法, 但是可以使用 XMLHttpRequest 对象发送 AJAX 请求
4. worker 线程不允许读取本地文件, 只允许加载网络文件

## 基本使用

::: code-group

```js [主线程]
// 主线程创建一个 worker 子线程
const worker = new Worker("./concurrent.js");
// 主线程向 worker 子线程发送消息
worker.postMessage("ping" /** any */);
// 主线程监听 worker 子线程返回的消息
worker.onmessage = function (ev) {
  // 主线程收到 worker 子线程返回的计算密集型任务的结果
  console.log("Receive message:", ev.data);
  // 主线程终止子线程
  worker.terminate();
};

// 主线程监听 worker 子线程的错误
worker.onerror(function (err) {
  console.log(err.filename, err.lineno, err.message);
});
// 等价于
worker.addEventListener("error", function (err) {
  console.log(err.filename, err.lineno, err.message);
});
```

```js [worker 子线程]
// worker 子线程监听 message 事件, 即监听主线程发送的消息
/** this. */ addEventListener("message", function (ev) {
  /** this. */ postMessage("Echo:", ev.data);
  // worker 子线程可以加载其他脚本
  importScripts("web_script.js");
  // worker 子线程可以自我关闭
  /** this. */ close();
});
```

:::

## 数据通信

主进程和 worker 进程的通信: 深拷贝

避免深拷贝: 使用 Transferable Objects (转移所有权)

```js
// 主进程
const arr = new Uint8Array(new ArrayBuffer(10));
worker.postMessage(arr); // 发送深拷贝后的字节数组
worker.postMessage(arr, [arr]); // 转移所有权

// worker 线程
this.onmessage = function (ev) {
  console.log(ev.data);
};
```
