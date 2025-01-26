// pnpm test prototype4
import { test } from "vitest";

test("Test1", () => {
  const obj = { a: 1 };
  console.log(obj.__proto__ === Object.prototype); // true
  // target ---> Object.prototype ---> null

  const arr = ["bh3", "ys", "hsr"];
  console.log(arr.__proto__ === Array.prototype); // true
  // arr ---> Array.prototype ---> Object.prototype ---> null

  function fn() {
    return 1;
  }

  console.log(fn.__proto__ === Function.prototype); // true
  console.log(fn.__proto__.toString()); // function () { [native code] }
  // fn ---> Function.prototype ---> Object.prototype ---> null

  const lambda = () => 1;
  console.log(lambda.__proto__ === Function.prototype); // true
  console.log(lambda.__proto__.toString()); // function () { [native code] }
  // lambda ---> Function.prototype ---> Object.prototype ---> null

  const extendsObj = { b: 2, __proto__: obj };
  console.log(extendsObj.__proto__ === obj); // true
  // extendsObj ---> target ---> Object.prototype ---> null
});

test("Test2", () => {
  function ArrWrapper() {
    this.arr = [];
  }

  ArrWrapper.prototype.pushElem = function (v) {
    this.arr.push(v);
  };

  const arrWrapper = new ArrWrapper();
  arrWrapper.pushElem(1);
});

test("Test3", () => {
  const grandpa = { v: 1 };
  console.log(grandpa.__proto__ === Object.prototype); // true
  // grandpa ---> Object.prototype ---> null

  const papa = Object.create(grandpa);
  // papa ---> grandpa ---> Object.prototype ---> null
  console.log(papa.v); // 1 (继承的)
  console.log(papa.__proto__ === grandpa); // true

  const son = Object.create(papa);
  console.log(son.v); // 1 (继承的)
  console.log(son.__proto__ === papa); // true
  // son ---> papa ---> grandpa ---> Object.prototype ---> null

  const extendsObj = Object.create(Object.prototype);
  // extendsObj ---> Object.prototype ---> null
  const extendsNull = Object.create(null);
  // extendsNull ---> null

  console.log(extendsObj.hasOwnProperty); // [Function: hasOwnProperty]
  // extendsObj 继承 Object.prototype
  console.log(extendsNull.hasOwnProperty); // undefined
  // extendsNull 未继承 Object.prototype
});

test("Test4", () => {
  class Rectangle {
    constructor(height, width) {
      console.log("Construct rect");
      this.height = height;
      this.width = width;
    }
  }

  class Square extends Rectangle {
    constructor(sideLen) {
      super(sideLen, sideLen);
    }

    get area() {
      console.log("Get area");
      return this.height * this.width;
    }

    set sideLen(newLen) {
      console.log("Set sideLen");
      this.height = newLen;
      this.width = newLen;
    }
  }

  const square = new Square(2); // Construct rect
  square.sideLen = 3; // Set sideLen
  console.log(square.area); // Get area
  // square ---> Square.prototype ---> Rect.prototype ---> Object.prototype ---> null
});

test("Test5", () => {
  const base = {
    val: 1,
    func() {
      return 2;
    },
  };

  const obj1 = {};
  const obj2 = {};
  const obj3 = { val: "newVal" };
  const obj4 = { func: () => "retStr" };
  const obj5 = {
    val: "newVal",
    func: () => "retStr",
  };
  // obj1 ---> base ---> Object.prototype ---> null

  Object.setPrototypeOf(obj1, base);
  Object.setPrototypeOf(obj2, base);
  Object.setPrototypeOf(obj3, base);
  Object.setPrototypeOf(obj4, base);
  Object.setPrototypeOf(obj5, base);

  console.log(obj1.val, obj1.func()); // 1 2
  console.log(obj2.val, obj2.func()); // 1 2
  console.log(obj3.val, obj3.func()); // newVal 2
  console.log(obj4.val, obj4.func()); // 1 retStr
  console.log(obj5.val, obj5.func()); // newVal retStr

  obj1.__proto__.val = 3;
  obj1.__proto__.func = function () {
    return 4;
  };

  console.log(obj1.val, obj1.func()); // 3 4
  console.log(obj2.val, obj2.func()); // 3 4
  console.log(obj3.val, obj3.func()); // newVal 4
  console.log(obj4.val, obj4.func()); // 3 retStr
  console.log(obj5.val, obj5.func()); // newVal retStr
});

test("Test6", () => {
  const son = { age: 1 };
  son.__proto__ = { papaAge: 2 };
  son.__proto__.__proto__ = { grandpaAge: 3 };
  console.log(son.age, son.papaAge, son.grandpaAge); // 1 2 3

  console.log(typeof Object); // function
  console.log(typeof Object.prototype); // object
  console.log(typeof Object.prototype.__proto__); // object
  console.log(Object.prototype.__proto__ === null); // true

  // Function.prototype 仅用于创建实例
});
