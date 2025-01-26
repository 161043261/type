/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// target: 类, 类是构造函数的语法糖
const classDecorator: ClassDecorator = (target) => {
  console.log(target.name); // Sugar
  console.log(typeof target); // function
  console.log(target.toString());
  // class Sugar {
  //   constructor() {}
  // }
  target.prototype.name = 'instance';
};

@classDecorator
class Sugar {
  constructor() {}
}

const sugar: any = new Sugar();
console.log(sugar.name); // instance
// classDecorator(Sugar); // @classDecorator 等价于 classDecorator(Sugar)
export default {};
