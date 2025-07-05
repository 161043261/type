// 结构型模式
class Normal {
  public sequential(): string {
    return "Design Pattern";
  }
}

class Abnormal {
  public reverse(): string {
    return "nrettaP ngiseD";
  }
}

class Adapter extends Normal {
  constructor(private abnormal: Abnormal) {
    super();
  }
  // @Override
  public sequential(): string {
    const result = this.abnormal.reverse().split("").reverse().join("");
    return `适配后: ${result}`;
  }
}

function clientCode(who: Normal) {
  console.log(who.sequential());
}

const normal = new Normal();
clientCode(normal);

const abnormal = new Abnormal();
console.log("适配前:", abnormal.reverse());

// 使用适配器
const adapter = new Adapter(abnormal);
clientCode(adapter);

export default {};
