// 创建型模式
// 生成器模式: 分步骤, 可选步骤创建复杂对象
interface Builder {
  producePartA(): void;
  producePartB(): void;
  producePartC(): void;
}

class ConcreteBuilder implements Builder {
  private _product: Product1;

  constructor() {
    this._product = new Product1();
  }

  public producePartA(): void {
    this._product.parts.push("PartA1");
  }

  public producePartB(): void {
    this._product.parts.push("PartB1");
  }

  public producePartC(): void {
    this._product.parts.push("PartC1");
  }

  get product(): Product1 {
    const pre = this._product;
    this._product = new Product1();
    return pre;
  }
}

class Product1 {
  public parts: string[] = [];
  public listParts(): void {
    console.log("产品 1:", this.parts.join(", "));
  }
}

class Director {
  private _builder: Builder | undefined;

  set builder(builder_: Builder) {
    this._builder = builder_;
  }

  public buildMinimalProduct(): void {
    this._builder?.producePartA();
  }

  public buildProduct(): void {
    this._builder?.producePartA();
    this._builder?.producePartB();
    this._builder?.producePartC();
  }
}

/////////////////////////////////////////////////

function clientCode(director: Director) {
  const builder = new ConcreteBuilder();
  director.builder = builder; // setter

  console.log("最小化构建产品");
  director.buildMinimalProduct();
  builder.product /** getter */
    .listParts();

  console.log("构建产品");
  director.buildProduct();
  builder.product /** getter */
    .listParts();

  console.log("自定义构建产品");
  builder.producePartA();
  builder.producePartC();
  builder.product /** getter */
    .listParts();
}

const director = new Director();
clientCode(director);
