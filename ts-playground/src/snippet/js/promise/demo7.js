/* eslint-disable @typescript-eslint/no-unused-vars */
function delay1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("ok1");
    }, 1000);
  });
}

function delay2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("ok2");
    }, 2000);
  });
}

function delay3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("ok3");
    }, 3000);
  });
}

(() => {
  let all = Promise.all([delay1(), delay2(), delay3()]);
  all.then((value) => {
    console.log(value); // [ 'ok1', 'ok2', 'ok3' ]
  });
})();
