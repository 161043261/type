/* eslint-disable @typescript-eslint/no-unused-vars */
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("ok1");
  }, 2000);
});

const p2 = Promise.resolve("ok2");
const p3 = Promise.resolve("ok3");
const race = Promise.race([p1, p2, p3]);
console.log(race);
//! race.PromiseState = fulfilled
//! race.PromiseResult = 'ok2'

// 场景: 请求超时提示
function req() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("请求成功");
    }, 10_000);
  });
}

function timeout() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("请求超时");
    }, 1000);
  });
}

Promise.race([req(), timeout()])
  .then((value) => {
    console.log(value);
  })
  .catch((reason) => {
    console.log(reason); // 请求超时
  });
