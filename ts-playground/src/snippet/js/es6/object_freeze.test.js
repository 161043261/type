import { test } from "vitest";

/**
 * Object.freeze() 静态方法可以冻结一个对象
 * 被冻结的对象不可写:
 * - 不可以更新已有的属性
 * - 不可以删除已有的属性
 * - 不可以添加新的属性
 * - 不可以重新指定对象的原型...
 * Object.freeze() 返回被冻结的传入的对象
 */

test("Test_ObjectFreeze", () => {
  const obj = {
    prop: 42,
  };

  Object.freeze(obj);
  try {
    obj.prop = 33;
  } catch (e) {
    // TypeError: Cannot assign to read only property 'prop' of object '#<Object>'
    console.log(e);
  }
  console.log(obj.prop); // 42
});

test("Test_Finalize", () => {
  const obj1 = { a: { v: 1 } };
  Object.freeze(obj1);
  obj1.a.v = 7;
  console.log(obj1); // { obj1: { v: 7 } };

  const finalize = (obj) => {
    Object.freeze(obj);

    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === "object") {
        finalize(obj[key]);
      }
    });
  };

  const obj2 = { a: { v: 1 } };
  finalize(obj2);
  try {
    obj2.a.v = 7;
  } catch (e) {
    console.log(e); // TypeError: Cannot assign to read only property 'v'...
  }
});
