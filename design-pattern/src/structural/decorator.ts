interface Component {
  operation(): string;
}

class ConcreteComponent implements Component {
  public operation(): string {
    return "组件";
  }
}

class Decorator implements Component {
  protected component: Component;
  constructor(component: Component) {
    this.component = component;
  }
  public operation(): string {
    return this.component.operation();
  }
}

class ConcreteDecoratorA extends Decorator {
  public operation(): string {
    return `A 装饰: ${super.operation()}`;
  }
}

class ConcreteDecoratorB extends Decorator {
  public operation(): string {
    return `B 装饰: ${super.operation()}`;
  }
}

function clientCode(component: Component) {
  console.log(component.operation());
}

const component = new ConcreteComponent();
clientCode(component);

const decoratorA = new ConcreteDecoratorA(component);
clientCode(decoratorA);
const decoratorB = new ConcreteDecoratorB(component);
clientCode(decoratorB);

export default {};
