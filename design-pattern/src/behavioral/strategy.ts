class Context {
  private strategy: Strategy;
  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  public doSomething(): void {
    const result = this.strategy.doAlgorithm("TypeScript".split(""));
    console.log(result.join(""));
  }
}

interface Strategy {
  doAlgorithm(data: string[]): string[];
}

class ConcreteStrategyA implements Strategy {
  doAlgorithm(data: string[]): string[] {
    return data.sort();
  }
}

class ConcreteStrategyB implements Strategy {
  doAlgorithm(data: string[]): string[] {
    return data.reverse();
  }
}

const context = new Context(new ConcreteStrategyA());
context.doSomething();
context.setStrategy(new ConcreteStrategyB());
context.doSomething();

export default {};
