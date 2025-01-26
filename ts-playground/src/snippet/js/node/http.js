/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const http = require("http");

//! 请求方法       request.method
//! HTTP 版本      request.httpVersion
//! 请求路径       request.url
//! URL 路径       require('url').parse(request.url).pathname
//! URL 查询字符串 require('url').parse(request.url, true).query
//! 请求头         request.headers
//! 请求体         request.on('data', function(chunk) {}); request.on('end', function() {})

const server = http.createServer((request, response) => {
  // 对象解构赋值
  let { url, method } = request;
  console.log("url", url);

  // 允许跨域请求
  response.setHeader("Access-Control-Allow-Origin", "*");

  response.setHeader("Content-Type", "text/html;charset=utf=8");
  // response.end('') 终止本次请求
  if (url === "/register" && method === "GET") {
    response.end("Register");
  } else if (url === "/login" && method === "GET") {
    response.end("Login");
  } else {
    response.end("404 Page Not Found");
  }
});

server.listen(9000, () => {
  console.log("HTTP listening on port 9000");
});

//! 设置响应状态码   response.statusCode
//! 设置响应状态描述 response.statusMessage
//! 设置响应头       response.setHeader('k', 'v')
//! 设置响应体       response.write('body'); response.end('body')
