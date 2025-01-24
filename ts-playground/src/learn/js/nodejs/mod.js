/* eslint-disable no-undef */

/**
 * @param {number} x
 * @param {number} y
 * @returns {number}
 */
function add(x, y) {
  return x + y;
}

console.log(module.exports === exports); //! true

// module.exports 指向新的对象, exports 仍指向原对象
module.exports = {
  add, // 等价于 add: add
  username: "wft_name",
};

console.log(module.exports === exports); //! false

exports = module.exports;

exports.password = "wtf_pwd";

console.log(module.exports === exports); //! false

// const mod = require('./mod')

//? require 导入自定义模块
//? 1. 将相对路径转换为绝对路径, 定位目标文件
//? 2. 检查缓存
//? 3. 读取目标文件代码
//? 4. 包裹为一个自执行函数, 通过  arguments.callee.toString() 查看自执行函数
//? 5. 缓存模块的值
//? 6. 返回 module.exports 的值

// function (exports, require, module, __filename, __dirname) {/* nativeCode */}
console.log(arguments.callee.toString());
console.warn("Cache miss!");

console.log(this);
