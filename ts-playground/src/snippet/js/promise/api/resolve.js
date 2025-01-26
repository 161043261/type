/* eslint-disable @typescript-eslint/no-unused-vars */
// 传递一个非 Promise 对象
const p1 = Promise.resolve(416);
//! p1.PromiseState = fulfilled
//! p1.PromiseResult = 416
console.log(p1);

// 传递一个 PromiseState === fulfilled 的 Promise 对象
const p2 = Promise.resolve(
  new Promise((resolve, reject) => {
    resolve("Any value");
  }),
);
//! p2.PromiseState = fulfilled
//! p2.PromiseResult = 'Any value'
console.log(p2);

// 传递一个 PromiseState === rejected 的 Promise 对象
const p3 = Promise.resolve(
  new Promise((resolve, reject) => {
    reject("Any reason");
  }),
);
console.log(p3);
//! p3.PromiseState = rejected
//! p3.PromiseResult = 'Any reason'
