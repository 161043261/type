/* eslint-disable @typescript-eslint/no-unused-vars */
const ok1 = new Promise((resolve, reject) => {
  resolve("ok1");
});

const ok2 = new Promise((resolve, reject) => {
  resolve("ok2");
});

const err1 = new Promise((resolve, reject) => {
  reject("err1");
});

const err2 = new Promise((resolve, reject) => {
  reject("err2");
});

const err3 = new Promise((resolve, reject) => {
  reject("I'm not OK");
}).catch((reason) => {
  // console.log("err3: ", reason);
  return "err3: I'm OK";
});

const p1 = Promise.all([ok1, ok2]);
console.log(p1);

//! p1.PromiseState = fulfilled
//! p1.PromiseResult = ["ok1", "ok2"]

const p2 = Promise.all([err1, err2]).catch((reason) => {});
console.log(p2);

//! p2.PromiseState = rejected
//! p2.PromiseResult = "err1"

const p3 = Promise.all([ok1, err1]).catch((reason) => {});
console.log(p3);

//! p3.PromiseState = rejected
//! p3.PromiseResult = "err1"

const p4 = Promise.all([ok1, err2, err1]).catch((reason) => {});
console.log(p4);

//! p4.PromiseState = rejected
//! p4.PromiseResult = "err2"

const p5 = Promise.all([err3, ok1]).catch((reason) => {});
console.log(p5);

//! p5.PromiseState = fulfilled
//! p5.PromiseResult = ["err3: I'm OK", "ok1"]
