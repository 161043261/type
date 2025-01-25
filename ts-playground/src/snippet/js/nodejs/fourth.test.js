//! 引用类型的深拷贝

//? 浅拷贝: 拷贝地址值
//? 深拷贝
// 1. 深拷贝单层 (属性值是基本类型) 对象:
//    - Object.assign();
//    - {...target};
// 2. 深拷贝一维基本类型数组:
//    - Array.prototype.concat();
//    - [...arr];
// 4. lodash.cloneDeep
// 5. JSON.stringify()
// 6. 递归实现深拷贝

import { test } from "vitest";
import _ from "lodash";

//! Object.assign()
test("Test_DeepClone1", () => {
  {
    let dst = { a: 1 };
    let src1 = { b: 2 };
    let src2 = { c: 3 };
    let ret = Object.assign(dst, src1, src2);
    console.log(dst === ret); // true
  }

  {
    //! passed
    let src = { a: 1, b: 2, c: 3 };
    let dst = {};
    Object.assign(dst, src);
    src.a = 4;
    src.d = 5;
    // { obj1: 1, obj2: 2, obj3: 3 }
    console.log(dst);
  }

  {
    //! failed
    let src = { a: { v1: 1 }, b: { v2: 2 }, c: { v3: 3 } };
    let dst = {};
    Object.assign(dst, src);
    src.a.v1 = 4;
    src.a.v4 = 5;
    // { obj1: { v1: 4, v4: 5 }, obj2: { v2: 2 }, obj3: { v3: 3 } }
    console.log(dst);
  }
});

//! {...target}
test("Test_DeepClone2", () => {
  {
    //! passed
    let src = { a: 1, b: 2, c: 3 };
    let dst = { ...src };
    src.a = 4;
    src.d = 5;
    // {obj1: 1, obj2: 2, obj3: 3}
    console.log(dst);
  }
  {
    //! failed
    let src = { a: { v1: 1 }, b: { v2: 2 }, c: { v3: 3 } };
    let dst = { ...src };
    src.a.v1 = 4;
    src.a.v4 = 5;
    // { obj1: { v1: 4, v4: 5 }, obj2: { v2: 2 }, obj3: { v3: 3 } }
    console.log(dst);
  }
});

//! Array.prototype.concat()
test("Test_DeepClone3", () => {
  {
    //! passed
    let src = [1, 2, 3];
    let dst = Array.prototype.concat(src);
    src[0] = 4;
    src[3] = 5;
    // [ 1, 2, 3 ]
    console.log(dst);
  }
  {
    //! failed
    let src = [{ a: 1 }, { b: 2 }, { c: 3 }];
    let dst = Array.prototype.concat(src);
    src[0].a = 4;
    src[0].d = 5;
    // [ { obj1: 4, d: 5 }, { obj2: 2 }, { obj3: 3 } ]
    console.log(dst);
  }
});

//! [...arr]
test("Test_DeepClone4", () => {
  {
    //! passed
    let src = [1, 2, 3];
    let dst = [...src];
    src[0] = 4;
    src[3] = 5;
    // [ 1, 2, 3 ]
    console.log(dst);
  }
  {
    //! failed
    let src = [{ a: 1 }, { b: 2 }, { c: 3 }];
    let dst = [...src];
    src[0].a = 4;
    src[0].d = 5;
    // [ { obj1: 4, d: 5 }, { obj2: 2 }, { obj3: 3 } ]
    console.log(dst);
  }
});

//! lodash.cloneDeep
test("Test_DeepClone5", () => {
  {
    //! passed
    let src = { a: { v1: 1 }, b: { v2: 2 }, c: { v3: 3 } };
    let dst = _.cloneDeep(src);
    src.a.v1 = 4;
    src.a.v4 = 5;
    // { obj1: { v1: 1 }, obj2: { v2: 2 }, obj3: { v3: 3 } }
    console.log(dst);
  }
  {
    //! passed
    let src = [{ a: 1 }, { b: 2 }, { c: 3 }];
    let dst = _.cloneDeep(src);
    src[0].a = 4;
    src[0].d = 5;
    // [ { obj1: 1 }, { obj2: 2 }, { obj3: 3 } ]
    console.log(dst);
  }
});

//! JSON.stringify()
test("Test_DeepClone6", () => {
  {
    //! passed
    let src = { a: { v1: 1 }, b: { v2: 2 }, c: { v3: 3 } };
    let dst = JSON.parse(JSON.stringify(src));
    src.a.v1 = 4;
    src.a.v4 = 5;
    // { obj1: { v1: 1 }, obj2: { v2: 2 }, obj3: { v3: 3 } }
    console.log(dst);
  }
  {
    //! passed
    let src = [{ a: 1 }, { b: 2 }, { c: 3 }];
    let dst = JSON.parse(JSON.stringify(src));
    src[0].a = 4;
    src[0].d = 5;
    // [ { obj1: 1 }, { obj2: 2 }, { obj3: 3 } ]
    console.log(dst);
  }
});

// TODO
function deepClone(dst, src) {
  for (let k in src) {
    if (src[k] instanceof Object) {
      dst[k] = {};
      deepClone(dst[k], src[k]);
    } else if (src[k] instanceof Array) {
      dst[k] = [];
      deepClone(dst[k], src[k]);
    } else {
      dst[k] = src[k];
    }
  }
}

test("Test_DeepClone7", () => {
  {
    //! passed
    let src = { a: { v1: 1 }, b: { v2: 2 }, c: { v3: 3 } };
    let dst = {};
    deepClone(dst, src);
    src.a.v1 = 4;
    src.a.v4 = 5;
    // { obj1: { v1: 1 }, obj2: { v2: 2 }, obj3: { v3: 3 } }
    console.log(dst);
  }
  {
    //! passed
    let src = [{ a: 1 }, { b: 2 }, { c: 3 }];
    let dst = [];
    deepClone(dst, src);
    src[0].a = 4;
    src[0].d = 5;
    // [ { obj1: 1 }, { obj2: 2 }, { obj3: 3 } ]
    console.log(dst);
  }
});
