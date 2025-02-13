# 装饰器

::: code-group

```ts [ClassDecorator]
// 类装饰器
// target: 类, 类是构造函数的语法糖
const classDecorator: ClassDecorator = (target) => {
  console.log(target.name); // Sugar
  console.log(typeof target); // function
  console.log(target.toString());
  // class Sugar {
  //   constructor() {}
  // }
  target.prototype.name = "instance";
};

@classDecorator
class Sugar {
  constructor() {}
}

const sugar: any = new Sugar();
console.log(sugar.name); // instance
// classDecorator(Sugar); // @classDecorator 等价于 classDecorator(Sugar)
```

```ts [PropertyDecorator]
// 属性装饰器
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
  public name: string = "instance";

  @propDecorator
  foo: (a: number, b: number) => number = function (a, b) {
    return a + b;
  };

  @propDecorator
  bar: (a: number, b: number) => number = (a, b) => a + b;
}

const sugar = new Sugar();
console.log(sugar.name); // instance
```

```ts [MethodDecorator]
// 方法装饰器
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
  private _name: string = "instance";

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
sugar.name = "newInstance";
console.log(sugar.name); // newInstance
```

```ts [ParameterDecorator]
// 参数装饰器
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
  private _name: string = "instance";
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
sugar.name = "newInstance";
console.log(sugar.name); // newInstance
```

:::

```ts
// 高阶函数
const Get: (url: string) => MethodDecorator = (url: string) => {
  return (target, propKey, propDescriptor) => {
    // console.log(propDescriptor.value);
    const method: any = propDescriptor.value;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        method(data, { statusCode: 200, statusText: "OK" });
      })
      .catch((err) => {
        method(err, { statusCode: 404, statusText: "Not Found" });
      });
  };
};

class Controller {
  constructor() {}
  @Get("https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10")
  getList(
    res: any,
    status: {
      statusCode: number;
      statusText: string;
    },
  ) {
    console.log(res?.result?.list, status);
  }
}
```
