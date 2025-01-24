/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
const fs = require("fs");

// 回调地狱
fs.readFile("./demo3.js", (err, data1) => {
  if (err) {
    throw err;
  }
  fs.readFile("./demo4.js", (err, data2) => {
    if (err) {
      throw err;
    }
    fs.readFile("./demo5.js", (err, data3) => {
      if (err) {
        throw err;
      }
      console.log((data1 + data2 + data3).toString().length);
    });
  });
});

// Promise 改写
new Promise((resolve, reject) => {
  fs.readFile("./demo3.js", (err, data) => {
    if (err) {
      reject(err);
    } //! else is redundant
    else resolve(data);
  });
})
  .then((value) => {
    return new Promise((resolve, reject) => {
      fs.readFile("./demo4.js", (err, data) => {
        if (err) {
          reject(err);
        }
        resolve([value, data]);
      });
    });
  })
  .then((value) => {
    return new Promise((resolve, reject) => {
      fs.readFile("./demo5.js", (err, data) => {
        if (err) {
          reject(err);
        }
        value.push(data);
        resolve(value);
      });
    });
  })
  .then((value) => {
    console.log(value.join("").length);
  });

// Promise.all 改写
const util = require("util");
const preadFile = util.promisify(fs.readFile);
const demo3 = preadFile("demo3.js");
const demo4 = preadFile("demo4.js");
const demo5 = preadFile("demo5.js");
const all = Promise.all([demo3, demo4, demo5]);
all.then((value) => {
  console.log(value.join("").length);
});
