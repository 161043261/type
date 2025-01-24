// target: 原型对象
// propertyKey: 方法名
// parameterIndex: 参数索引
const paramDecorator: ParameterDecorator = (
  target,
  propertyKey,
  parameterIndex,
) => {
  // {} foo 1
  // {} foo 0
  console.log(target, propertyKey, parameterIndex);
};
class Sugar {
  private _name: string = 'instance';
  foo(@paramDecorator a: number, @paramDecorator b: number) {
    return a + b;
  }
  get name() {
    return this._name;
  }
  set name(@paramDecorator newName: string) {
    this._name = newName;
  }
}

const sugar = new Sugar();
console.log(sugar.name); // instance
sugar.name = 'newInstance';
console.log(sugar.name); // newInstance

export default {};
