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
