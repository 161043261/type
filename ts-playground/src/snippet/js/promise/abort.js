/* eslint-disable @typescript-eslint/no-unused-vars */
new Promise((resolve, reject) => {
  resolve(1);
})
  .then((value) => {})
  .then((value) => {
    console.log("Try1...");
    throw new Error("err");
  })
  .then(
    (value) => {},
    (reason) => {
      console.log("Try2...");
      return new Promise((resolve, reject) => {
        resolve("ok");
      });
    },
  )
  .then((value) => {
    console.log("Try3...");
    return new Promise((resolve, reject) => {});
  })
  .then((value) => {
    console.log("Try4...");
  })
  .finally(() => {
    console.log("Finally...");
  });
