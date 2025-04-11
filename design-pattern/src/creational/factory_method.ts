// 创建型模式
// 工厂方法: 抽象父类中声明创建对象的抽象方法, 子类中决定实例化对象的类型
abstract class Creator {
  public abstract factoryMethod(): Product;
  public someOperation(): string {
    const product = this.factoryMethod(); // 工厂方法
    return product.operation();
  }
}

class ConcreteCreator1 extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProduct1();
  }
}

class ConcreteCreator2 extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProduct2();
  }
}

interface Product {
  operation(): string;
}

class ConcreteProduct1 implements Product {
  public operation(): string {
    return "具体产品 1";
  }
}

class ConcreteProduct2 implements Product {
  public operation(): string {
    return "具体产品 2";
  }
}

/////////////////////////////////////////////////

function clientCode(creator: Creator) {
  console.log(creator.someOperation());
}

clientCode(new ConcreteCreator1());
clientCode(new ConcreteCreator2());

export default {};
