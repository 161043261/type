prototype 是 (构造) 函数的属性

prototype 定义:为其他对象提供共享属性的对象

不是所有的函数都有 prototype 属性, 函数 bind() 方法返回的函数没有 prototype 属性

`Object.prototype.__proto__ === null`

```js
Boolean.__proto__ === Function.prototype;
Number.__proto__ === Function.prototype;
String.__proto__ === Function.prototype;
Object.__proto__ === Function.prototype;
Function.__proto__ === Function.prototype;
(Object.__proto__.__proto__ === Function.prototype.__proto__) === Object;
```

原型对象的属性或方法可以修改

```js
function Demo() {}
Demo.prototype.name = "demo";
const demo = new Demo();
console.log(demo.name); // demo
Demo.prototype.name = "demo2";
console.log(demo.name); // demo2
```

new 一个对象时发生了什么

1. 创建一个空对象
2. 将空对象的 `__proto__` 指向构造函数的 prototype 属性
3. 将构造函数的 this 指向新创建的对象
4. 如果构造函数没有返回值, 则实际构造的是新对象
5. 如果构造函数返回值是引用类型, 则实际构造的是返回值
6. 如果构造函数返回值是基本类型, 则忽略返回值, 实际构造的是新对象

实现 new 操作

```js
function myNew() {
  const obj = new Object();
  const constructor = Array.prototype.shift.call(arguments);
  console.log(constructor); // [Function: Demo]
  console.log(arguments); // [Arguments] { '0': 'Automatic', '1': 22 }
  obj.__proto__ = constructor.prototype;
  const ret = constructor.apply(obj, arguments);
  return typeof ret === "object" && result !== null ? ret : obj;
}

function myNew2(constructor, ...args) {
  const obj = Object.create(constructor.prototype);
  const ret = constructor.apply(obj /** this */, args);
  return typeof ret === "object" && result !== null ? ret : obj;
}

function Demo(name, age) {
  this.name = name;
  this.age = age;
  this.say = function () {
    console.log(this.name, this.age);
  };
}

Demo.prototype.name2 = "whoami";
Demo.prototype.age2 = 23;
Demo.prototype.say2 = function () {
  console.log(this.__proto__.name2, this.__proto__.age2);
};

const demo = myNew(Demo, "Automatic", 22);
// Automatic 22 whoami 23
console.log(demo.name, demo.age, demo.name2, demo.age2);
demo.say(); // Automatic 22
demo.say2(); // whoami 23

const demo2 = myNew2(Demo, "Automatic", 22);
// Automatic 22 whoami 23
console.log(demo2.name, demo2.age, demo2.name2, demo2.age2);
demo2.say(); // Automatic 22
demo2.say2(); // whoami 23
```
