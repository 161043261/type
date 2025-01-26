/* eslint-disable no-undef */
// node --expose-gc ./src/gc.js # 允许手动垃圾回收

global.gc(); // 手动垃圾回收
console.log("1.", process.memoryUsage().heapUsed); // 查看堆内存占用
let wm = new WeakMap();
let bigArr = new Array(5 * 1024 * 1024); // 变量 bigArr 引用一个大数组
wm.set(bigArr /* 键 */, 1);
global.gc(); // 手动垃圾回收
console.log("2.", process.memoryUsage().heapUsed); // 查看堆内存占用
bigArr = null; // 清除变量 bigArr 对大数组的引用, 未清除 wm 的键对大数组的引用
global.gc(); // 手动垃圾回收
console.log("3.", process.memoryUsage().heapUsed); // 查看堆内存占用
