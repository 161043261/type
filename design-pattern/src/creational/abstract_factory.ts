// 创建型模式
// 抽象工厂: 可以创建多种类型的对象, 且不依赖对象所属的类
interface AbstractFactory {
  createProductA(): AbstractProductA;
  createProductB(): AbstractProductB;
}

class ConcreteFactory1 implements AbstractFactory {
  public createProductA(): AbstractProductA {
    return new ConcreteProductA1();
  }
  public createProductB(): AbstractProductB {
    return new ConcreteProductB1();
  }
}

class ConcreteFactory2 implements AbstractFactory {
  public createProductA(): AbstractProductA {
    return new ConcreteProductA2();
  }
  public createProductB(): AbstractProductB {
    return new ConcreteProductB2();
  }
}

// AbstractProductA: A 产品族
interface AbstractProductA {
  funcA(): string;
}

class ConcreteProductA1 implements AbstractProductA {
  public funcA(): string {
    return "具体产品 A1";
  }
}

class ConcreteProductA2 implements AbstractProductA {
  public funcA(): string {
    return "具体产品 A2";
  }
}

// AbstractProductB: B 产品族
interface AbstractProductB {
  funcB(): string;
  anotherFuncB(collaborator: AbstractProductA): string;
}

class ConcreteProductB1 implements AbstractProductB {
  public funcB(): string {
    return "具体产品 B1";
  }

  public anotherFuncB(collaborator: AbstractProductA): string {
    const result = collaborator.funcA();
    return `具体产品 B1, 合作者: ${result}`;
  }
}

class ConcreteProductB2 implements AbstractProductB {
  public funcB(): string {
    return "具体产品 B2";
  }

  public anotherFuncB(collaborator: AbstractProductA): string {
    const result = collaborator.funcA();
    return `具体产品 B2, 合作者: ${result}`;
  }
}

/////////////////////////////////////////////////

function clientCode(factory: AbstractFactory) {
  const productA = factory.createProductA();
  const productB = factory.createProductB();
  console.log(productA.funcA());
  console.log(productB.funcB());
  console.log(productB.anotherFuncB(productA));
}

clientCode(new ConcreteFactory1());
clientCode(new ConcreteFactory2());

export default {};
