/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-unsafe-function-type */
const annotation: ClassDecorator = (target: Function) => {
  console.log(target.name); // Inner
  console.log(typeof target); // function
  console.log(target.toString()); // class Inner{static{__name(this,"Inner")}constructor(){}}
  target.prototype.name = "Instance";
};

@annotation
class Inner {
  constructor() {}
}

const inner: any = new Inner();
console.log(inner.name);
// annotation(Inner); // @annotation 等价于 annotation(Inner)
