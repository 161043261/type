const MethodDecoratorFn: MethodDecorator = (
  target,
  propKey,
  propDescriptor,
) => {
  console.log(target);
  console.log(propKey);
  console.log(propDescriptor);
};
// target: {}
// propKey: foo
// propDescriptor: {
//   value: [Function: foo],
//   writable: true,
//   enumerable: false,
//   configurable: true
// }

// target: {}
// propKey: propName
// propDescriptor: {
//   get: [Function: get propName],
//   set: [Function: set propName],
//   enumerable: false,
//   configurable: true
// }

// 不能对 get, set 同时使用装饰器, 对 get 或 set 中任意一个使用装饰器即可
class Demo {
  #propName: string = 'propVal';

  @MethodDecoratorFn
  foo(a: number, b: number) {
    return a + b;
  }

  @MethodDecoratorFn
  public get propName(): string {
    return this.#propName;
  }

  public set propName(val: string) {
    this.#propName = val;
  }
}
const demo = new Demo();
demo.foo(1, 2);
demo.propName = 'newVal';
console.log(demo.propName); // newVal
export default {};
