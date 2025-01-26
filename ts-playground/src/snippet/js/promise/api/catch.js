/* eslint-disable @typescript-eslint/no-unused-vars */
const p1 = new Promise((resolve, reject) => {
  reject("Any reason");
})./* 未指定 onrejected 时, 异常穿透 */ then(
  (value) => {
    console.log(value);
  } /* onfulfilled */,
);

p1.catch((reason) => {
  console.log("Caught:", reason);
});

//! Caught: Any reason

const p2 = new Promise((resolve, reject) => {
  resolve("I'm OK");
})
  .then((value) => {
    throw new Error("I'm not OK");
  })
  .then((value) => {
    console.log(value);
  });

p2.catch((reason) => {
  console.log("Caught:", reason);
});

// Caught: Error: I'm not OK

const p3 = new Promise((resolve, reject) => {
  resolve("I'm OK");
})
  .then((value) => {
    throw new Error("1st, I'm not OK");
  })
  .then(
    (value) => {
      console.log(value);
    },
    (reason) => {
      console.log("On rejected:", reason);
      return reason;
    },
  )
  .then((value) => {
    throw new Error("2nd, I'm not OK");
  }) /* 异常穿透 */
  .then((value) => {
    throw new Error("3rd, I'm not OK");
  });

p3.catch((reason) => {
  console.log("Caught:", reason);
});

// On rejected: Error: 1st, I'm not OK
// Caught: Error: 2nd, I'm not OK
