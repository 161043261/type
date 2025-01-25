// Object.seal() 密封一个对象
// 密封对象不能添加新属性, 不能删除已有属性, 只能更新已有属性

import { test } from "vitest";

test("Test1", () => {
  const obj = {
    prop: 81,
  };
  Object.seal(obj);
  obj.prop = 64;
  console.log(obj.prop); // 64

  try {
    obj.newProp = function () {};
  } catch (e) {
    // TypeError
    console.error(e.message.split("\n")[0]);
  }

  try {
    delete obj.prop;
  } catch (e) {
    // TypeError
    console.error(e.message.split("\n")[0]);
  }

  console.log(obj.prop); // 64
});

// node
test("Test2", () => {
  const obj = {
    prop() {},
    fa: "iPhone",
  };

  obj.fa = "iPad";
  obj.fm = "Microsoft";
  delete obj.prop; // target.pop = function() {}
  const obj_ = Object.seal(obj);
  console.log(obj_ === obj); // true

  // 可以更新密封对象的属性值
  obj.fa = "MacBook";

  // 不能将数据属性转换为访问者属性,
  // 也不能将访问者属性转换为数据属性
  try {
    Object.defineProperty(obj, "fa", {
      get() {
        return "MacBook";
      },
    });
  } catch (e) {
    // TypeError
    console.log(e.message.split("\n")[0]);
  }

  // 不能添加新属性, 不能删除已有属性, ...
  // 尝试使用 Object.defineProperty 添加新属性也会抛出 TypeError 错误
  try {
    Object.defineProperty(obj, "wtf", {
      value: "wtf",
    });
  } catch (e) {
    console.error(e.message.split("\n")[0]);
  }

  Object.defineProperty(obj, "fa", {
    value: "wtf",
  });
  console.log("target:", obj); // target: { fa: 'wtf', fm: 'Microsoft' }

  // ES5 中, 如果 Object.seal 方法的参数是基本类型, 则会抛出 TypeError 错误
  // Object.seal(1)
});
