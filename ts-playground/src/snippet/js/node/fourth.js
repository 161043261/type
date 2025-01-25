//! 箭头函数 (lambda 表达式) 没有 this, this 被视为变量向外层查找
//! 普通函数和函数表达式有 this, this 指向函数的调用者
"use strict";
function greet1() {
  console.log(this);
}

const greet2 = () => {
  console.log(this);
};

const greet3 = function () {
  console.log(this);
};

greet1(); // undefined, Window{}
greet2(); //        {}, Window{}
greet3(); // undefined, Window{}

const caller = {
  name: "caller",
};

caller.greet1 = greet1;
caller.greet2 = greet2;
caller.greet3 = greet3;
caller.greet1(); // caller,   caller
caller.greet2(); //     {}, Window{}
caller.greet3(); // caller,   caller

//! DOM 事件的回调函数不推荐使用箭头函数
//! 基于原型的面向对象不推荐使用箭头函数
function Person() {}

Person.prototype.walk = () => {
  console.log(this); // {}, Window{}
};

const p1 = new Person();
p1.walk();

///////////////////
// 改变 this 的指向
///////////////////
//! func.call(thisVal, ...args);
//! func.apply(thisVal, args[]);
//! 指定 this 的值为 thisVal
function icmp(...args) {
  console.log(this, args);
}

let send = {
  name: "ping",
};

let recv = {
  name: "pong",
};

icmp.call(send, "ip", "tcp", "udp");
icmp.call(recv, "ip", "tcp", "udp");
icmp.apply(send, ["ip", "tcp", "udp"]);
icmp.apply(recv, ["ip", "tcp", "udp"]);

//! const newFunc = func.bind(thisVal)
//! 创建一个 "指定 this 的值为 thisVal" 的新函数
const newIcmp = icmp.bind({ name: "wtf" });
newIcmp("ip", "tcp", "udp");

//! 防抖 (debounce): 连续触发事件, n 秒内函数只执行最后 1 次 (回城)
//! 节流 (throttle): 连续触发事件, n 秒内函数只执行第 1 次 (技能 CD)
