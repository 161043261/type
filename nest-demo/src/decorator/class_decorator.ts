/* eslint-disable @typescript-eslint/no-unsafe-member-access */
const ClassDecoratorFn: ClassDecorator = (target) => {
  console.log(target); // [class Demo]
  console.log(target.name); // Demo
  console.log(typeof target); // function
  target.prototype.attrName = 'attrVal';
};

@ClassDecoratorFn
class Demo {
  constructor() {}
}
const demo: Demo & { attrName?: string } = new Demo();
console.log(demo.attrName); // attrVal
export default {};
