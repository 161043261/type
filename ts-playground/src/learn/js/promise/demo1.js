/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");

// console.log(process.argv);

//! process.argv[0] == '/path/to/node'
//! process.argv[1] == '/path/to/runningScript'

if (process.argv[2].toLowerCase() === "n") {
  //#region
  fs.readFile(
    "./promise.md",
    /**
     * @param {*} err
     * @param {Buffer} data
     */
    (err, data) => {
      if (err) {
        throw err;
      } else {
        console.log(data.toString().slice(0, 10));
      }
    },
  );
  //#endregion
} else if (process.argv[2].toLowerCase() === "p") {
  //#region
  const p = new Promise((resolve, reject) => {
    fs.readFile("./promise.md", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });

  p.then(
    (value) => {
      console.log(value.toString().slice(0, 10));

      // TODO try to uncomment next line
      // return value.toString().slice(0, 10)
    } /* onfulfilled */,
    (reason) => {
      console.log(reason);
    } /* onrejected */,
  )

    .then(
      (value) => {
        // TODO see output
        console.log(value); // undefined
      } /* onfulfilled */,
      (reason) => {
        console.log(reason);
      } /* onrejected */,
    );
  //#endregion
} else {
  console.log("Usage: node demo1 [n|p], n as normal, p as promise");
}
