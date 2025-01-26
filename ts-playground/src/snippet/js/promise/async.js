/* eslint-disable @typescript-eslint/no-unused-vars */
async function f1() {
  /////////
  return 1;
  /////////
}

console.log(f1());
//! f1() == Promise{ PromiseState: 'fulfilled', PromiseResult: 1 }

f1().then((value) => {
  console.log(value); // 1
}); /* : Promise{ PromiseState: 'fulfilled', PromiseResult: undefined } */

//? f1 等价于 f2

async function f2() {
  /////////////////////////////////////////
  return new Promise((resolve, reject) => {
    resolve(1);
  });
  /////////////////////////////////////////
}

console.log(f2());
//! f2() == Promise{ PromiseState: 'fulfilled', PromiseResult: 1 }

f2().then((value) => {
  console.log(value); // 1
  return undefined;
}); /* : Promise{ PromiseState: 'fulfilled', PromiseResult: undefined } */

/**************************** hr ********************************/

async function f3() {
  return new Error(0);
}

console.log(f3());
//! f3() == Promise{ PromiseState: 'fulfilled', PromiseResult: Error{0} }

//? f3 区别于 f4, f5

async function f4() {
  ///////////////////
  throw new Error(0);
  ///////////////////
}

console.log(f4());
//! f4() == Promise{ PromiseState: 'rejected', PromiseResult: Error{0} }

f4().then(
  (value) => {},
  (reason) => {
    console.log(reason); // Error{0}
  },
); /* : Promise{ PromiseState: 'fulfilled', PromiseResult: undefined } */

async function f5() {
  /////////////////////////////////////////
  return new Promise((resolve, reject) => {
    reject(new Error(0));
  });
  /////////////////////////////////////////}
}
//? f4 等价于 f5

console.log(f5());
//! f5() == Promise{ PromiseState: 'rejected', PromiseResult: Error{0} }

f5().then(
  (value) => {},
  (reason) => {
    console.log(reason); // Error{0}
    return undefined;
  },
); /* : Promise{ PromiseState: 'fulfilled', PromiseResult: undefined } */

async function f6() {
  throw new Error("I'm not OK");
}

console.log(f6());
//! f6() == Promise{ PromiseState: 'rejected', PromiseResult: Error{"I'm not OK"} }

f6().catch((reason) => {
  console.log(reason); // Error{"I'm not OK"}
}); /* : Promise{ PromiseState: 'fulfilled', PromiseResult: undefined } */

//? f6 等价于 f7

async function f7() {
  const executor = (resolve, reject) => {
    reject(new Error("I'm not OK"));
  };
  return new Promise(executor);
}

console.log(f7());
//! f7() == Promise{ PromiseState: 'rejected', PromiseResult: Error{"I'm not OK"} }

f7().catch((reason) => {
  console.log(reason); // Error{"I'm not OK"}
  return undefined;
}); /* : Promise{ PromiseState: 'fulfilled', PromiseResult: undefined } */
