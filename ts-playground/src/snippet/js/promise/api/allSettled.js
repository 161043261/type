/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
// import { XMLHttpRequest } from "xmlhttprequest";
const { XMLHttpRequest } = require("xmlhttprequest");

function get_(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("get", url, true);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.responseText);
        }
        reject("URL error"); // URL error
      }
    };
  });
}

// 使用 Promise.all
Promise.all([
  get_("https://ys.mihoyo.com/"),
  get_("https://sr.mihoyo.com/"),
  get_("https://bronya.com/"),
]).then(
  (value) => {
    console.log(value.join("").length);
  },
  (reason) => {
    console.log(reason);
  },
);

// 使用 Promise.allSettled
Promise.allSettled([
  get_("https://ys.mihoyo.com/"),
  get_("https://sr.mihoyo.com/"),
  get_("https://bronya.com/"),
]).then(
  (value) => {
    let mapVal = value.map((item) => {
      if (item.value !== undefined) {
        item.value = item.value.slice(0, 15);
      }
      return item;
    });
    console.log(mapVal);
  },
  (reason) => {
    console.log(reason);
  },
);
