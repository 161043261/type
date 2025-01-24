/**
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy
 * @description Proxy: 创建一个对象的代理对象, 以实现操作的捕捉 (拦截)
 * 例
 * handler.has(): in 操作符的捕捉器
 * handler.get(): 属性读操作的捕捉器
 * handler.get(): 属性写操作的捕捉器
 */

//! 术语
// handler 处理器, 处理器是捕获器的集合
// traps 捕获器
// target 被代理的对象
// po 代理对象
//
// const handler = { traps1, traps2 }
// const po = new Proxy(target, handler)
import { test } from "vitest";

test("Test1", () => {
  const handler = {
    //! handler.get() 属性读操作的捕获器
    /**
     *
     * @param {*} obj
     * @param {string} prop
     * @returns {*}
     */
    get: function (obj, prop) {
      console.log("proxying");
      return prop in obj ? obj[prop] : "violet-ever-garden";
    },
  };

  const target = {};
  const po = new Proxy(target, handler);
  po.a = 1;
  po.b = 2;

  console.log(target); // { obj1: 1, obj2: 2 }
  console.log(po); // { obj1: 1, obj2: 2 }

  console.log(target.a, target.b);
  // 1 2
  console.log(po.a, po.b);
  // proxying 1
  // proxying 2

  console.log("c" in target, target.c);
  // false undefined
  console.log("c" in po, po.c);
  // proxying
  // false violet-ever-garden
});

// 代理对象 po 的处理器 handler 为空时 (没有捕获器 traps)
// 代理对象 po 上的所有操作会被转发到被代理的对象 target
test("Test2", () => {
  let target = {};
  let po = new Proxy(target, {} /* handler */);
  po.a = 1;
  console.log(target.a);
});

// 使用代理对象进行字段校验
test("Test3", () => {
  let validator /* handler */ = {
    //! handler.set() 属性写操作的捕获器
    set: function (obj, prop, value) {
      if (prop === "age") {
        if (!Number.isInteger(value)) {
          throw new TypeError("The age is not an integer");
        }
      }
      if (value < 0) {
        throw new RangeError("The age seems invalid");
      }
      obj[prop] = value;
      return true;
    },
  };

  let person /* po */ = new Proxy({}, validator);
  person.age = 100;
  console.log(person.age); // 100

  try {
    person.age = "young";
  } catch (e) {
    console.warn(e.message); // The age is not an integer
  }

  try {
    person.age = -1;
  } catch (e) {
    console.warn(e.message); // The age seems invalid
  }
});
