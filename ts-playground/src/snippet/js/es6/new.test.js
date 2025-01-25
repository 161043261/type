import { test } from "vitest";

test(
  "Test1",
  () => {
    function User(name) {
      // this = {}; // 隐式创建
      console.log(this);
      this.name = name;
      // return this; // 隐式返回
    }
    let user = new User("wtf");
    console.log(user); // User { name: 'wtf' }
    User("wtf");
  },
  {
    skip: true,
  },
);

// 可以使用 new.target 检查函数是否被 new 调用
test("Test2", () => {
  function User() {
    console.log(new.target);
  }
  User(); // undefined
  new User(); // [Function: User]
});

test("Test3", () => {
  function User(name) {
    if (!new.target) {
      return new User(name);
    }
    this.name = name;
  }
  let user = User("wtf");
  console.log(user); // User { name: 'wtf' }
});

// 通常, 构造函数没有 return, 构造函数返回 this
// 如果 return 引用类型, 则返回该对象
// 如果 return 基本类型, 则忽略, 仍返回 this

test("Test4", () => {
  function User() {
    this.name = "wtf";
    return { age: 3.5 };
  }
  console.log(new User()); // { age: 3.5 }

  function Admin() {
    this.name = "wtf";
    return 3.5; // return this
  }
  console.log(new Admin()); // Admin { name: 'wtf' }
});

test("Test5", () => {
  function User(name) {
    this.name = name;
    this.say = function () {
      return `My name is ${this.name}`;
    };
  }
  let user = new User("wtf");
  console.log(user.constructor === User); // true
});
