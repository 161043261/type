interface ICommand {
  execute(): void;
}

class SimpleCommand implements ICommand {
  private payload: string;
  constructor(payload: string) {
    this.payload = payload;
  }

  public execute(): void {
    console.log("SimpleCommand:", this.payload);
  }
}

class ComplexCommand implements ICommand {
  constructor(
    private receiver: Receiver,
    private a: string,
    private b: string,
  ) {}
  public execute(): void {
    this.receiver.doSomething(this.a);
    this.receiver.doSomethingElse(this.b);
  }
}

class Receiver {
  public doSomething(a: string): void {
    console.log(`Receiver: ${a}`);
  }

  public doSomethingElse(b: string): void {
    console.log(`Receiver: ${b}`);
  }
}

class Invoker {
  private onStart: ICommand | null = null;
  private onEnd: ICommand | null = null;
  public setOnStart(command: ICommand): void {
    this.onStart = command;
  }
  public setOnEnd(command: ICommand): void {
    this.onEnd = command;
  }
  public do(): void {
    if (this.onStart) {
      console.log("Invoker: onStart");
      this.onStart.execute();
    }
    console.log("Invoker: doing");
    if (this.onEnd) {
      console.log("Invoker: onEnd");
      this.onEnd.execute();
    }
  }
}

const invoker = new Invoker();
invoker.setOnStart(new SimpleCommand("Say hello"));
const receiver = new Receiver();
invoker.setOnEnd(new ComplexCommand(receiver, "Say thanks", "Say bye"));
invoker.do();

export default {};
