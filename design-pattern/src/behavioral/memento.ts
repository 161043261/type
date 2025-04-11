class Originator {
  private state: string;
  constructor(state: string) {
    this.state = state;
    console.log("Initial state:", this.state);
  }

  public updateState(): void {
    this.state = this.generateRandomStr();
    console.log("Current state:", this.state);
  }

  private generateRandomStr(length: number = 10): string {
    const charSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return Array.from({ length })
      .map(() => charSet.charAt(Math.floor(Math.random() * charSet.length)))
      .join("");
  }

  public save(): Memento {
    return new ConcreteMemento(this.state);
  }

  public restore(memento: Memento): void {
    this.state = memento.getState();
  }
}

interface Memento {
  getState(): string;
}

class ConcreteMemento implements Memento {
  private state: string;
  constructor(state: string) {
    this.state = state;
  }

  public getState(): string {
    return this.state;
  }
}

class TakeCare {
  private mementos: Memento[] = [];
  private originator: Originator;

  constructor(originator: Originator) {
    this.originator = originator;
  }

  public backup(): void {
    this.mementos.push(this.originator.save());
  }

  public undo(): void {
    if (!this.mementos.length) {
      return;
    }
    const memento = this.mementos.pop()!;
    console.log("Restore state:", memento.getState());
    this.originator.restore(memento);
  }

  public showHistory(): void {
    for (let i = this.mementos.length - 1; i >= 0; i--) {
      console.log("History stack:", this.mementos[i].getState());
    }
  }
}

const originator = new Originator("abcdefghij");
const takeCare = new TakeCare(originator);

takeCare.backup();
originator.updateState();

takeCare.backup();
originator.updateState();

takeCare.backup();
originator.updateState();

takeCare.showHistory();

takeCare.undo();
takeCare.undo();

export default {};
