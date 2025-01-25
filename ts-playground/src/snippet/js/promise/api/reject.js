/* eslint-disable @typescript-eslint/no-unused-vars */
// 传递一个非 Promise 对象
const p1 = Promise.reject(416);
//! p1.PromiseState = rejected
//! p1.PromiseResult = 416
console.log(p1);

// 传递一个 PromiseState === fulfilled 的 Promise 对象
const p2 = Promise.reject(
  new Promise((resolve, reject) => {
    resolve("Any value");
  }),
);
//! p2.PromiseState = rejected
//! p2.PromiseResult = Promise{ PromiseState: 'fufilled', PromiseResult: 'Any value' }
console.log(p2);

// 传递一个 PromiseState === rejected 的 Promise 对象
const p3 = Promise.reject(
  new Promise((resolve, reject) => {
    reject("Any reason");
  }),
);
//! p3.PromiseState = rejected
//! p3.PromiseResult = Promise{ PromiseState: 'rejected', PromiseResult: 'Any reason' }
console.log(p3);
