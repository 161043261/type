/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");

/**
 * @param {string} path
 * @return {Promise}
 */
function readFileTask(path) {
  // return fs.readFileSync(path);
  return new Promise(
    /**
     *
     * @param {(string) => void} resolve
     * @param {(any) => void} reject
     */
    (resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (err) {
          reject("Read file error");
        } else {
          resolve(data.toString());
        }
      });
    },
  );
}

// readFileTask("./promise.md").then(
//   (value) => {
//     console.log(value.slice(0, 10));
//   } /* onfulfilled */,
//   (reason) => {
//     console.log(reason || "No data!");
//   },
// ); /* onrejected */

/**
 * @param {string} path
 * @return {Promise}
 */
async function readFileAsync(path) {
  return readFileTask(path)
    .catch((reason) => {
      console.error("Catch reason:", reason);
      return reason;
    })
    .finally(() => {
      console.log("Read file done!");
    });
}

(async () => {
  const data = await readFileAsync("./dismiss.md");
  console.log("Data:", data);
})();

//! 使用 util.promisify

const util = require("util");
const promisifiedReadFile = util.promisify(fs.readFile);
promisifiedReadFile("./promise.md").then(
  (value) => {
    console.log(value.toString().slice(0, 10));
  },
  (reason) => {
    console.log(reason);
  },
);
