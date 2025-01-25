/* eslint-disable @typescript-eslint/no-unused-vars */
const p = new Promise((resolve, reject) => {
  resolve("ok");
  // reject("err");
});

p.then((res) => {
  console.log(res);
})
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    console.log("Finally...");
  });
