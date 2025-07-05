interface Mediator {
  notify(sender: object, eventName: string): void;
}

class ConcreteMediator implements Mediator {
  private component1: Component1;
  private component2: Component2;
  constructor(c1: Component1, c2: Component2) {
    this.component1 = c1;
    this.component1.setMediator(this);
    this.component2 = c2;
    this.component2.setMediator(this);
  }
  public notify(sender: object, eventName: string): void {
    if (eventName === "A") {
      this.component2.afterA();
    }
    if (eventName === "B") {
      this.component1.afterB();
    }
  }
}

class BaseComponent {
  protected mediator: Mediator | undefined = undefined;
  constructor(mediator?: Mediator) {
    this.mediator = mediator;
  }
  public setMediator(mediator: Mediator): void {
    this.mediator = mediator;
  }
}

class Component1 extends BaseComponent {
  public doA(): void {
    console.log("Component 1: do A");
    this.mediator?.notify(this, "A");
  }
  public afterB(): void {
    console.log("Component 1: after B");
  }
}

class Component2 extends BaseComponent {
  public afterA(): void {
    console.log("Component 2: after A");
  }

  public doB(): void {
    console.log("Component 2: do B");
    this.mediator?.notify(this, "B");
  }
}

const c1 = new Component1();
const c2 = new Component2();
const mediator = new ConcreteMediator(c1, c2);

c1.doA();
c2.doB();

// Component 1: do A
// Component 2: after A
// Component 2: do B
// Component 1: after B

export default {};
