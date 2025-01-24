//! pnpm test prototype3
import { test } from "vitest";

// JavaScript 中, 函数也有属性
// 所有函数都有一个特殊属性 prototype

test("Test1", () => {
  function ConstructFunc() {}
  console.log(ConstructFunc.prototype); // {}

  const ConstructByArrowFunc = () => {};
  console.log(ConstructByArrowFunc.prototype); // undefined

  // 向 Constructor.prototype 上添加 foo 属性
  ConstructFunc.prototype.foo = "bar";
  // instance.__proto__ == Constructor.prototype
  const instance = new ConstructFunc();
  // 向 instance 实例上添加 prop 属性
  instance.prop = "V8";
  console.log(instance); // Constructor { prop: 'V8' }
  console.log(instance.__proto__); // { foo: 'bar' }
  console.log(instance.foo); // bar
});

// 访问 instance 的某属性时, 先在 instance 上查找该属性
// 如果 instance 上没有该属性, 则继续在 instance.__proto__ 上查找该属性
// (instance.__proto__ === ConstructFunc.prototype)
// 如果 instance.__proto__ 上没有该属性, 则继续在 instance.__proto__.__proto__ 上查找该属性
// instance.__proto__.__proto__ === ConstructFunc.prototype.__proto__
// instance.__proto__.__proto__.__proto__ === ConstructFunc.prototype.__proto__.__proto__

test("Test2", () => {
  function ConstructFunc() {}
  ConstructFunc.prototype.foo = "bar";
  const instance = new ConstructFunc();
  instance.prop = "V8";

  // instance.foo = bar
  console.log("instance.foo =", instance.foo);
  // instance.prop = V8
  console.log("instance.prop =", instance.prop);

  // ConstructFunc.foo = undefined
  console.log("ConstructFunc.foo =", ConstructFunc.foo);
  // ConstructFunc.prop = undefined
  console.log("ConstructFunc.prop =", ConstructFunc.prop);

  // ConstructFunc.prototype.foo = bar
  console.log("ConstructFunc.prototype.foo =", ConstructFunc.prototype.foo);
  // ConstructFunc.prototype.prop = undefined
  console.log("ConstructFunc.prototype.prop =", ConstructFunc.prototype.prop);
});
