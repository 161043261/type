// 宏任务 0 (整体代码)
async function wtf() {
  console.log('Y')
  await Promise.resolve(); // 宏任务 0 的微任务 0
  console.log('X')
  // 等价于
  // Promise.resolve().then((/* value */) => console.log('X'))
}

setTimeout(() => {
  console.log(1)
  Promise.resolve().then((/* value */) => console.log(2)) // 宏任务 1 的微任务 5
}, 0) // 宏任务 1

setTimeout(() => {
  console.log(3);
  Promise.resolve().then(() => console.log(4)) // 宏任务 2 的微任务 6
}, 0); // 宏任务 2

Promise.resolve().then((/* value */) => console.log(5)) // 宏任务 0 的微任务 1
Promise.resolve().then((/* value */) => console.log(6)) // 宏任务 0 的微任务 2
Promise.resolve().then((/* value */) => console.log(7)) // 宏任务 0 的微任务 3
Promise.resolve().then((/* value */) => console.log(8)) // 宏任务 0 的微任务 4

wtf();
console.log(0)

// 宏任务队列: 宏任务 0,           宏任务 1,   宏任务 2
// 微任务队列: 微任务 1,2,3,4,0,   微任务 5,   微任务 6

// Y 0 5 6 7 8 X 1 2 3 4 (3 轮事件循环)