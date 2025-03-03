const PropertyDecoratorFn: PropertyDecorator = (target, propertyKey) => {
  console.log(target, propertyKey);
  // {} propName
  // {} foo
  // {} bar
};

class Demo {
  @PropertyDecoratorFn
  public propName: string = 'propVal';
  @PropertyDecoratorFn
  foo: (a: number, b: number) => number = function (a, b) {
    return a + b;
  };
  @PropertyDecoratorFn
  bar: (a: number, b: number) => number = (a, b) => a - b;
  constructor() {}
}
const demo = new Demo();
console.log(demo.propName);
export default {};
