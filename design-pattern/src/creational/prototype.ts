// 创建型模式
// 原型模式: 复制对象, 且不依赖对象所属的类

// proto.forwardReference <---ref--- backReference
// backReference.proto <---ref---proto
class Proto {
  constructor(
    public primitive: boolean | number | string | bigint,
    public component: object,
    public forwardReference?: BackReference,
  ) {}

  public clone(): this /** class Proto */ {
    const clone = Object.create(this);
    console.log(
      "Object.getPrototypeOf(clone) === this:",
      Object.getPrototypeOf(clone) === this,
    ); // clone.__proto__ === this

    clone.component = Object.create(this.component);
    console.log(
      "Object.getPrototypeOf(clone.component) === this.component:",
      Object.getPrototypeOf(clone.component) === this.component,
    ); // clone.component.__proto__ === this.component

    clone.forwardReference = {
      // ...this.forwardReference,
      // proto: {...this},
      proto: clone,
    };
    // console.log("this.forwardReference:", this.forwardReference);
    // console.log("clone.forwardReference:", clone.forwardReference);
    return clone;
  }
}

class BackReference {
  constructor(public proto: Proto) {}
}

function clientCode() {
  const p1 = new Proto(416, new Date());
  p1.forwardReference = new BackReference(p1);

  const p2 = p1.clone();
  console.log("p1.primitive === p2.primitive:", p1.primitive === p2.primitive); // true

  console.log("p1.component === p2.component:", p1.component === p2.component); // false

  console.log(
    "p1.forwardReference === p2.forwardReference:",
    p1.forwardReference === p2.forwardReference,
  ); // false

  console.log(
    "p1.forwardReference.proto === p2.forwardReference.proto:",
    p1.forwardReference.proto === p2.forwardReference?.proto,
  ); // false
}

clientCode();

export default {};
