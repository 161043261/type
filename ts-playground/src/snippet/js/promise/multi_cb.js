/* eslint-disable @typescript-eslint/no-unused-vars */
let p = new Promise((resolve, reject) => {
  resolve("ok");
  // reject('err')
});

p.then(
  (value) => {
    console.log("ok cb1");
  },
  (reason) => {
    console.log("err cb2");
  },
);

p.then(
  (value) => {
    console.log("ok cb2");
  },
  (reason) => {
    console.log("err cb2");
  },
);
