/* eslint-disable @typescript-eslint/no-unused-vars */
const err1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("err1");
  }, 1000);
});

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("ok1");
  }, 2000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("ok2");
  }, 10_000);
});

Promise.any([err1, p1, p2]).then((value) => {
  console.log("fulfilled:", value);
});

//! PromiseState = fulfilled
//! PromiseResult = "ok1"
