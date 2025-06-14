class Bridge {
  protected impl: ImplementMe;
  constructor(impl: ImplementMe) {
    this.impl = impl;
  }
  public operation(): string {
    return this.impl.operation();
  }
}

interface ImplementMe {
  operation(): string;
}

class ConcreteImplementA implements ImplementMe {
  public operation(): string {
    return "A 实现";
  }
}

class ConcreteImplementB implements ImplementMe {
  public operation(): string {
    return "B 实现";
  }
}

function clientCode(bridge: Bridge) {
  console.log(bridge.operation());
}

let impl = new ConcreteImplementA();
let bridge = new Bridge(impl);
clientCode(bridge);

impl = new ConcreteImplementB();
bridge = new Bridge(impl);
clientCode(bridge);

export default {};
