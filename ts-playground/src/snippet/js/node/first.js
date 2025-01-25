//! 闭包
function outer() {
  let cnt = 1;
  return () => {
    console.log(`Called ${cnt} times`);
    cnt++;
  };
}

const counter = outer();
counter();
counter();
counter();

// 闭包 = 内层函数 + 外层函数的变量
// 优点: 封闭数据
// 缺点: 可能会内存泄露

//! var 变量提升: 允许变量在初始化前访问
// let, const 没有变量提升
console.log(str); // undefined
var str = "Hello";

//! 函数提升: 允许函数在声明前调用
// 函数表达式, lambda 表达式 (箭头函数) 没有函数提升
foo();

function foo() {
  console.log("foo");
}

try {
  bar1();
  const bar1 = function () {
    console.log("bar1");
  };
} catch (e) {
  console.error(e.toString().slice(16));
}

try {
  bar2();
  const bar2 = () => {
    console.log("bar2");
  };
} catch (e) {
  console.error(e.toString().slice(16));
}

//! 参数默认值
function print(name = "foo", age) {
  console.log(`name: ${name}, age: ${age}`);
}

print(); // name: foo, age: undefined
print("bar"); // name: bar, age: undefined
print("bar", 3.5); // name: bar, age: 3.5

//! 动态参数
function sum() {
  // [Arguments] { '0': 1, '1': 2, '2': 3 }
  console.log(arguments);
  let ret = 0;
  for (let key /* string */ in arguments) {
    ret += arguments[key];
  }
  return ret;
}

console.log(sum(1, 2, 3)); // 6

//! 剩余参数 (最右边)
function req(url, ...queries) {
  console.log(url);
  console.log(queries);
}
req("developer.mozilla.org", "zh-CN", "docs", "Learn");

//!1. 箭头函数不能使用 arguments 动态参数, 可以使用 ...剩余参数
//!2. 箭头函数 (lambda 表达式) 没有 this, this 被视为变量向外层查找
//!3. 普通函数和函数表达式有 this, this 指向函数的调用者
const fn = () => {
  console.log(this); // {} | Window{}
};
fn();

const o1 = {
  method: () => {
    console.log(this); // {} | Window{}
  },
};
o1.method();

const o2 = {
  method: function () {
    (() => {
      console.log(this); // o2
    })();
  },
};
o2.method();

// 数组解构赋值, 对象解构赋值
