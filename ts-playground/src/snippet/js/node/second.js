// 1. 构造函数: 使用 new 关键字调用的函数
// 2. 实例化: 使用 new 关键字调用函数
// 3. 无参构造函数可以省略 ()
// 4. 构造函数的 return: 无返回值; 返回基本类型; 返回引用类型 (对象)

// 无返回值
function P1() {
  this.name = "wtf";
}

// 返回基本类型
function P2() {
  this.name = "wtf";
  return 1;
}

// 返回引用类型 (对象)
function P3() {
  this.name = "wtf";
  return {
    age: 3.5,
  };
}

// P1 { name: 'wtf' }
// P2 { name: 'wtf' }
// { age: 3.5 }
console.log(new P1(), new P2(), new P3());

//! 静态成员: 构造函数的属性和方法
function Person() {}

Person.happy = true;
Person.smile = function () {
  console.log("happy:", this.happy); // this 指向 Person
  console.log("smile");
};

Person.smile();

//! 包装类型: 数值, 布尔值, 字符串
console.log(new Number(1), new Boolean(true), new String("wtf"));
//! 内置构造函数: Object, Number, Boolean, String, Array, ...
