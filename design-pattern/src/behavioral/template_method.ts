abstract class AbstractClass {
  public templateMethod(): void {
    this.setup();

    this.onBeforeMount();
    this.onMounted();

    this.onBeforeUpdate();
    this.onUpdated();

    this.onBeforeUnmount();
    this.onUnmounted();
  }

  protected setup() {
    console.log("setup 创建阶段");
  }

  protected onBeforeMount() {} /** {
    console.log("onBeforeMount 挂载前, 获取不到 DOM ");
  } */
  protected onBeforeUpdate() {} /** {
    console.log("onBeforeUpdate 更新前, 获取的是 oldValue");
  } */
  protected onBeforeUnmount() {} /** {
    console.log("onBeforeUnmount 卸载前, 可以获取到 DOM");
  } */

  protected abstract onMounted(): void; /** {
    console.log("onMounted 挂载后, 可以获取到 DOM");
  } */
  protected abstract onUpdated(): void; /** {
    console.log("onUpdated 更新后, 获取的是 newValue");
  } */
  protected abstract onUnmounted(): void; /** {
    console.log("onUnmounted 卸载后, 获取不到 DOM");
  } */
}

class ConcreteClass extends AbstractClass {
  protected onMounted() {
    console.log("onMounted 挂载后, 可以获取到 DOM");
  }
  protected onUpdated() {
    console.log("onUpdated 更新后, 获取的是 newValue");
  }
  protected onUnmounted() {
    console.log("onUnmounted 卸载后, 获取不到 DOM");
  }
}

const Override: MethodDecorator = (target, propertyKey, descriptor: any) => {
  console.log("Override", descriptor.value);
};

class ConcreteClass2 extends AbstractClass {
  @Override
  protected onBeforeMount() {
    console.log("onBeforeMount 挂载前, 获取不到 DOM ");
  }
  @Override
  protected onBeforeUpdate() {
    console.log("onBeforeUpdate 更新前, 获取的是 oldValue");
  }
  @Override
  protected onBeforeUnmount() {
    console.log("onBeforeUnmount 卸载前, 可以获取到 DOM");
  }
  protected onMounted() {
    console.log("onMounted 挂载后, 可以获取到 DOM");
  }
  protected onUpdated() {
    console.log("onUpdated 更新后, 获取的是 newValue");
  }
  protected onUnmounted() {
    console.log("onUnmounted 卸载后, 获取不到 DOM");
  }
}

function clientCode(abstractClass: AbstractClass) {
  abstractClass.templateMethod();
}

clientCode(new ConcreteClass());
clientCode(new ConcreteClass2());

export default {};
