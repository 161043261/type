class Flyweight {
  private sharedState: string[];
  constructor(sharedState: string[]) {
    this.sharedState = sharedState;
  }

  public operation(uniqueState: string[]): void {
    console.log("sharedState:", JSON.stringify(this.sharedState));
    console.log("uniqueState:", JSON.stringify(uniqueState));
  }
}

class FlyweightFactory {
  private flyweights: { [key: string]: Flyweight } = {};
  constructor(initialValue: string[][]) {
    for (const states of initialValue) {
      this.flyweights[states.join("_")] = new Flyweight(states);
    }
  }

  public getFlyweight(sharedState: string[]): Flyweight {
    const key = sharedState.join("_");
    if (!(key in this.flyweights)) {
      console.log("Add!");
      this.flyweights[key] = new Flyweight(sharedState);
    } else {
      console.log("Duplicate!");
    }
    return this.flyweights[key];
  }

  public listFlyweights(): void {
    const count = Object.keys(this.flyweights).length;
    console.log("size:", count);
    for (const key in this.flyweights) {
      console.log("key:", key, "value:", JSON.stringify(this.flyweights[key]));
    }
  }
}

const factory = new FlyweightFactory([
  ["Chevrolet", "Camaro2018", "pink"],
  ["Mercedes Benz", "C300", "black"],
  ["Mercedes Benz", "C500", "red"],
  ["BMW", "M5", "red"],
  ["BMW", "X6", "white"],
]);

factory.listFlyweights();

function addCarToDatabase(
  plates: string,
  owner: string,
  brand: string,
  model: string,
  color: string,
) {
  const flyweight = factory.getFlyweight(
    [brand, model, color] /** sharedState */,
  );
  flyweight.operation([plates, owner] /** uniqueState */);
}

addCarToDatabase("CL234IR", "James Doe", "BMW", "M5", "red");
addCarToDatabase("CL234IR", "James Doe", "BMW", "X1", "red");
factory.listFlyweights();
