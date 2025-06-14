class Context {
  private state: State | null = null;

  constructor(state: State) {
    this.transitionTo(state);
  }

  public transitionTo(state: State): void {
    this.state = state;
    this.state.setContext(this);
  }

  public requestA(): void {
    this.state?.handleA();
  }

  public requestB(): void {
    return this.state?.handleB();
  }
}

abstract class State {
  protected context: Context | null = null;

  public setContext(context: Context): void {
    this.context = context;
  }

  public abstract handleB(): void;

  public abstract handleA(): void;
}

class ConcreteStateA extends State {
  public handleA() {
    console.log("ConcreteStateA handles requestA");
  }

  public handleB() {
    console.log("ConcreteStateA handles requestB...");
    this.context?.transitionTo(new ConcreteStateB());
    console.log("Context transitions to stateB");
  }
}

class ConcreteStateB extends State {
  public handleA() {
    console.log("ConcreteStateB handles requestA...");
    this.context?.transitionTo(new ConcreteStateA());
    console.log("Context transitions to stateA");
  }

  public handleB() {
    console.log("ConcreteStateB handles requestB");
  }
}

const context = new Context(new ConcreteStateA());
context.requestB(); // transit state to B
context.requestA(); // transit state to A

export default {};
