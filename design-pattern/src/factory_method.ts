//
// 创建型模式: 工厂方法
//
abstract class Creator {
  public abstract factoryMethod(): Product;
  public someOperation(): string {
    const product = this.factoryMethod();
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
    return "我是具体产品 1";
  }
}

class ConcreteProduct2 implements Product {
  public operation(): string {
    return "我是具体产品 2";
  }
}

/////////////////////////////////////////////////

function clientCode(creator: Creator) {
  console.log("我不知道创建者的类型");
  console.log(creator.someOperation());
}

clientCode(new ConcreteCreator1());
clientCode(new ConcreteCreator2());

export default {};
