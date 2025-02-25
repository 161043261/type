const ParamDecoratorFn: ParameterDecorator = (target, propKey, propIdx) => {
  console.log(target);
  console.log(propKey);
  console.log(propIdx);
};
// target: {}
// propKey: foo
// propIdx: 1

// target: {}
// propKey: foo
// propIdx: 0

class Demo {
  #propName: string = 'propVal';
  foo(@ParamDecoratorFn a: number, @ParamDecoratorFn b: number) {
    return a + b;
  }
  get propName() {
    return this.#propName;
  }
  // 无效
  set propName(@ParamDecoratorFn name: string) {
    this.#propName = name;
  }
}
const demo = new Demo();
console.log(demo.propName); // propVal
demo.propName = 'newVal';
console.log(demo.propName); // newVal
export default {};
