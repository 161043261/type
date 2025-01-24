//! target: 原型对象
//! propertyKey: 属性名
const propDecorator: PropertyDecorator = (target, propertyKey) => {
  // {} name
  // {} foo
  // {} bar
  console.log(target, propertyKey);
};

class Sugar {
  @propDecorator
  public name: string = 'instance';

  @propDecorator
  foo: (a: number, b: number) => number = function (a, b) {
    return a + b;
  };

  @propDecorator
  bar: (a: number, b: number) => number = (a, b) => a + b;
}

const sugar = new Sugar();
console.log(sugar.name); // instance
export default {};
