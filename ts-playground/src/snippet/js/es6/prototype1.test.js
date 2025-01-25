//! pnpm test prototype1
"use strict";
// 基于原型链的继承
import { test } from "vitest";

test("Test1", () => {
  console.log(typeof Object); // function
  console.log(Object.prototype); // [Object: null prototype] {}

  const obj = {
    a: 1,
    b: 2,

    __proto__: {
      b: 3,
      c: 4,
    },
  };

  console.log(obj.a, obj.b, obj.c, obj.d); // 1 2 4 undefined
});
