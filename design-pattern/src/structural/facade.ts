class Facade {
  protected subSystem: SubSystem;
  protected subSystem2: SubSystem2;
  constructor(subSystem?: SubSystem, subSystem2?: SubSystem2) {
    this.subSystem = subSystem ?? new SubSystem();
    this.subSystem2 = subSystem ?? new SubSystem2();
  }

  public operation(): string {
    let result = "Facade:\n";
    result += this.subSystem.operation1();
    result += this.subSystem2.operation1();
    result += this.subSystem.operationN();
    result += this.subSystem2.operationN();
    return result;
  }
}

class SubSystem {
  public operation1(): string {
    return "SubSystem: Ready!\n";
  }
  public operationN(): string {
    return "SubSystem: Go!\n";
  }
}

class SubSystem2 {
  public operation1(): string {
    return "SubSystem2: Ready!\n";
  }
  public operationN(): string {
    return "SubSystem2: Go!\n";
  }
}

function clientCode(facade: Facade) {
  console.log(facade.operation());
}
const facade = new Facade();
clientCode(facade);

export default {};
