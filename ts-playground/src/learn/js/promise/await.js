/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
(async () => {
  //! await 非 promise 对象
  const num = await 1;

  console.log(num); //? 1

  //! await PromiseState == fulfilled 的 promise 对象
  const str = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("ok");
    }, 3000);
  });

  console.log(str); //? str == PromiseResult == "ok"

  //! await PromiseState == rejected 的 promise 对象
  //! 需要使用 try...catch 块
  try {
    const perr = await new Promise((resolve, reject) => {
      reject("I'm not OK");
    });
    console.log(perr);
  } catch (e) {
    console.log(e); //? I'm not OK
  }

  //! await PromiseState == fulfilled 的 promise 对象
  const pok = await new Promise((resolve, reject) => {
    reject("I'm not OK");
  }).catch((reason) => {
    console.log(reason); //? I'm not OK
    return "小步舞曲";
  }); /* : Promise{ PromiseState: "fulfilled", PromiseResult: "小步舞曲" } */

  console.log(pok); //? str == PromiseResult == 小步舞曲
})();

/****************************** demo1 ******************************/

/* async */ function delay() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Timeout: 3000ms");
    }, 3000);
  });
}

(async () => {
  let str = await delay();
  console.log(str); //? Timeout: 3000ms
})();

/****************************** demo2 ******************************/
// 使用 async/await 读文件

const fs = require("fs");
const { promisify } = require("util");
const preadFile = promisify(fs.readFile);

(async () => {
  try {
    let demo3 = await preadFile("../promise/demo3.js");
    let demo4 = await preadFile("../promise/demo4.js");
    let demo5 = await preadFile("../promise/demo5.js");
    console.log("Total length:", (demo3 + demo4 + demo5).toString().length);
  } catch (e) {
    console.log(e);
  }
})();
