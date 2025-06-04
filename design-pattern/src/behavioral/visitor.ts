interface Component {
  accept(visitor: Visitor): void;
}

class ConcreteComponentA implements Component {
  public accept(visitor: Visitor): void {
    visitor.visitComponentA(this);
  }

  public toString(): string {
    return "ConcreteComponentA";
  }
}

class ConcreteComponentB implements Component {
  public accept(visitor: Visitor) {
    visitor.visitComponentB(this);
  }

  public toString(): string {
    return "ConcreteComponentB";
  }
}

interface Visitor {
  visitComponentA(element: ConcreteComponentA): void;
  visitComponentB(element: ConcreteComponentB): void;
}

class ConcreteVisitor implements Visitor {
  visitComponentA(element: ConcreteComponentA): void {
    console.log(`ConcreteVisitor: ${element.toString()}`);
  }

  visitComponentB(element: ConcreteComponentB): void {
    console.log(`ConcreteVisitor: ${element.toString()}`);
  }
}

class ConcreteVisitor2 implements Visitor {
  visitComponentA(element: ConcreteComponentA): void {
    console.log(`ConcreteVisitor2: ${element.toString()}`);
  }

  visitComponentB(element: ConcreteComponentB): void {
    console.log(`ConcreteVisitor2: ${element.toString()}`);
  }
}

function clientCode(components: Component[], visitor: Visitor) {
  for (const component of components) {
    component.accept(visitor);
  }
}

const components = [new ConcreteComponentA(), new ConcreteComponentB()];

const visitor = new ConcreteVisitor();
clientCode(components, visitor);

const visitor2 = new ConcreteVisitor2();
clientCode(components, visitor2);

export default {};
