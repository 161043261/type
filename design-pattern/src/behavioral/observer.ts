interface Subject {
  attach(observer: Observer): void;

  detach(observer: Observer): void;

  notify(): void;
}

class ConcreteSubject implements Subject {
  public state: number = 0;
  private observers: Observer[] = [];

  public attach(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      return console.log("Subject: Observer already exist");
    }
    console.log("Subject: Attached an observer");
    this.observers.push(observer);
  }

  public detach(observer: Observer): void {
    const observerIdx = this.observers.indexOf(observer);
    if (observerIdx === -1) {
      return console.log("Subject: Observer not found");
    }
    this.observers.splice(observerIdx, 1);
    console.log("Subject: Detached an observer");
  }

  public notify(): void {
    console.log("Subject: Notifying observers");
    for (const observer of this.observers) {
      observer.update(this);
    }
  }

  public updateState(): void {
    this.state = Math.floor(Math.random() * 10); // [0, 10)
    console.log(`Subject: Updating state to ${this.state}`);
    this.notify();
  }
}

interface Observer {
  update(subject: Subject): void;
}

class ConcreteObserverA implements Observer {
  public update(subject: ConcreteSubject): void {
    if (subject.state < 5) {
      console.log(`ConcreteObserverA: Reacted`);
    } else {
      console.log(`ConcreteObserverA: Ignored`);
    }
  }
}

class ConcreteObserverB implements Observer {
  public update(subject: ConcreteSubject): void {
    if (subject.state >= 5) {
      console.log(`ConcreteObserverB: Reacted`);
    } else {
      console.log(`ConcreteObserverB: Ignored`);
    }
  }
}

const subject = new ConcreteSubject();
const observer = new ConcreteObserverA();
const observer2 = new ConcreteObserverB();

subject.attach(observer2);
subject.updateState();
subject.updateState();
subject.updateState();

subject.attach(observer);
subject.updateState();
subject.updateState();
subject.updateState();

export default {};
