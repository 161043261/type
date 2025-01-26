//! target: 原型对象
//! propertyKey: 方法名
//! propDescriptor: 属性描述对象
const methodDecorator: MethodDecorator = (
  target,
  propertyKey, // methodName
  propDescriptor,
) => {
  // {} foo { value, writable, enumerable, configurable }
  // {} name { get, set, enumerable, configurable }
  console.log(target, propertyKey, propDescriptor);
};

// 不能对 get, set 同时使用装饰器, 对 get 或 set 中任意一个使用装饰器即可
class Sugar {
  private _name: string = 'instance';

  @methodDecorator
  foo(a: number, b: number) {
    return a + b;
  }

  @methodDecorator
  get name() {
    return this._name;
  }

  set name(newName: string) {
    this._name = newName;
  }
}

const sugar = new Sugar();
console.log(sugar.name); // instance
sugar.name = 'newInstance';
console.log(sugar.name); // newInstance

export default {};
