//! Class.prototype: 用于创建实例
//! instance.__proto__: 组成原型链

function Person() {
  this.happy = true;
  this.greet = function () {
    console.log("damn");
  };
}

Person.prototype.greet = function () {
  console.log("wtf");
};

let p = new Person();
//! 访问对象 target 的属性或方法时, 先查找 target, 再查找原型链
p.greet(); //? damn

//! Class.prototype.constructor: 指向类的构造函数
console.log(Person.prototype.constructor === Person); //? true

///////////////////////////////////////////
//! 实例对象.__proto__ := 构造函数.prototype
///////////////////////////////////////////

console.log(
  "Function.prototype === Person.__proto__:",
  Function.prototype === Person.__proto__,
); //? true

console.log(
  "Person.prototype === p.__proto__:",
  Person.prototype === p.__proto__,
); //? true

console.log(
  "Person.prototype.constructor === Person:",
  Person.prototype.constructor === Person,
); //? true

console.log(
  "p.__proto__.constructor === Person:",
  p.__proto__.constructor === Person,
); //? true

//! Person.prototype.constructor ===
//! p.__proto__.constructor === Person

function Man() {}

Man.prototype = new Person();
console.log(Man.prototype.constructor); //? f Person() {...}
//* Class.prototype.constructor: 指向类的构造函数
Man.prototype.constructor = Man;
const man = new Man();

console.log(
  "Man.prototype === man.__proto__:",
  Man.prototype === man.__proto__,
); //! true

class Woman extends Person {}
const woman = new Woman();

console.log(
  "Woman.prototype === woman.__proto__:",
  Woman.prototype === woman.__proto__,
); //! true

console.log(
  "Woman.prototype.constructor === Woman:",
  Woman.prototype.constructor === Woman,
); //! true

/************************* 继承 *************************/

console.log(
  "Man.prototype.__proto__ === Person.prototype",
  Man.prototype.__proto__ === Person.prototype,
); //! false

console.log(
  "Woman.prototype.__proto__ === Person.prototype:",
  Woman.prototype.__proto__ === Person.prototype,
); //! true

//? Man.prototype === man.__proto__
//? Woman.prototype === woman.__proto__

console.log(
  "man.__proto__.__proto__ === Person.prototype",
  man.__proto__.__proto__ === Person.prototype,
); //! false

console.log(
  "woman.__proto__.__proto__ === Person.prototype:",
  woman.__proto__.__proto__ === Person.prototype,
); //! true

/**************************************************/

//! 访问对象 target 的属性或方法时, 先查找 target, 再查找原型链
//! 原型链: target -> target.__proto__ -> target.__proto__.proto__

console.log("Object.prototype:", Object.prototype); //? [Object: null prototype] {}
console.log("Object.prototype.__proto__:", Object.prototype.__proto__); //? null

const p1 = new Person();
console.log("p1 instanceof Person:", p1 instanceof Person); //? true
console.log("p1 instanceof Object:", p1 instanceof Object); //? true
console.log("Array instanceof Object:", Array instanceof Object); //? true

//! Class.prototype: 用于创建实例
//! instance.__proto__: 组成原型链
