/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const request = require("xmlhttprequest");

let { XMLHttpRequest } = request;

let xhr = new XMLHttpRequest();
xhr.open("get", "https://go.dev/");
xhr.send();
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status >= 200 && xhr.status < 300) {
      console.log(xhr.responseText.slice(0, 15));
      // 回调地狱
      let xhr1 = new XMLHttpRequest();
      xhr1.open("POST", "https://nodejs.org/zh-cn");
      xhr1.send();
      xhr1.onreadystatechange = function () {
        if (xhr1.readyState === 4) {
          if (xhr1.status >= 200 && xhr.status < 300) {
            console.log(xhr1.responseText.slice(0, 15));
            // 回调地狱
          }
        }
      };
    }
  }
};

//? 缩进的很恶心
//? 应该将 '数据请求' 和 '数据处理' 分开
