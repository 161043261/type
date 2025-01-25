/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
// fs: file system

//! fs.writeFile(file, data[, options], callback)  异步写入
//! fs.writeFileSync(file, data[, options])        同步写入
//! fs.appendFile(file, data[, options], callback) 异步追加
//! fs.appendFileSync(file, data[, options])       同步追加
//! fs.createWriteStream(path[, options])          (异步) 创建文件写入流

// CommonJS
const fs = require("fs");

// ES module
// import fs from "fs";

//? Node.js 的磁盘操作是其他线程执行的
//? handlerSync: 同步处理, JS 主线程等待其他线的执行结果, 效率较低
//? handler: 异步处理, JS 主线程不等待其他线程的执行结果, 效率较高

// 异步
fs.writeFile("./song1.txt", "和平", (err) => {
  if (err) {
    console.log(err);
  }
});

console.log("Write Start"); //! 1

// 同步
fs.appendFileSync("./song1.txt", "爱情证书");

//? 流式写入可以减少打开, 关闭文件的次数
//? writeFile 适用于写入频率低的场景
//? 流式写入适用于写入频率高, 或写入大文件的场景

//#region
/**
 * @param {string[]} records
 */
const pro = ((records) => {
  return new Promise((resolve, reject) => {
    let ws = fs.createWriteStream("./song2.txt"); // 创建文件写入流
    ws.on("error", (err) => {
      reject(err);
    });

    ws.on("finish", () => {
      resolve();
    });

    for (let record of records) {
      ws.write(record);
    }

    ws.end();
    // throw new Error("哈哈哈")
  });
})(["和平\r\n", "爱情证书\r\n"]);
//#endregion

//! fs.readFile(path[, options], callback) 异步读出
//! fs.readFileSync(path[, options])       同步读出
//! fs.createReadStream(path[, options])   (异步) 创建文件读出流

fs.readFile("./song1.txt", "utf-8" /* 可选 */, (err, data) => {
  if (err) {
    throw err;
  }
  console.log("Read:", data); //! 5
});

//? 流式读出
pro.then(
  () => {
    let data = fs.readFileSync("./song2.txt", "utf-8" /* 可选 */);
    console.log("Sync read:", data); //! 2
    let rs = fs.createReadStream("./song2.txt");
    rs.on("data", (data) => {
      console.log("Read stream:", data.toString()); //! 3
    });

    rs.on("end", () => {
      console.log("Read stream done"); //! 4
    });
  } /* onfulfilled */,
  (reason) => {
    console.log("Catched:", reason);
  }, // onrejected
);

//! rename(oldPath, newPath, callback) 移动/重命名 文件/目录
//! renameSync(oldPath, newPath)       同步移动/重命名 文件/目录

/*************************************************************/

//! unlink(path, callback) 删除文件
//! unlinkSync(path)       同步删除文件

/*************************************************************/

//! fs.mkdir(path[, options], callback)   创建文件夹
//! fs.mkdirSync(path[, options])         同步创建文件夹
//! fs.readdir(path[, options], callback) 读取文件夹
//! fs.readdirSync(path[, options])       同步读取文件夹
//! fs.rmdir(path[, options], callback)   删除文件夹
//! fs.rmdirSync(path[, options])         同步删除文件夹

/*************************************************************/

//! fs.stat(path[, options], callback) 查看资源信息
//! fs.statSync(path[, options])       同步查看资源信息

//* size        文件大小
//* birthtime   创建时间
//* mtime       修改时间
//* isFile      是否为文件
//* isDirectory 是否为目录

//? __dirname 和 require 都是 Node.js 的全局变量
//? __dirname 保存当前目录的绝对路径
