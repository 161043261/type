// 创建型模式
// 单例模式: 保证一个类只有一个实例 (该实例全局可访问)
class Singleton {
  static #instance: Singleton;

  private constructor() {}

  public static get instance(): Singleton {
    if (!Singleton.#instance) {
      Singleton.#instance = new Singleton();
    }
    return Singleton.#instance;
  }
}

function clientCode() {
  const s1 = Singleton.instance;
  const s2 = Singleton.instance;
  console.log("s1 === s2:", s1 === s2); // true
}

clientCode();

export default {};
