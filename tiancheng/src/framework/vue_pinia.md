# Vue3 Pinia

Pinia 状态管理库, 状态即响应式数据

## 使用 Pinia

```ts
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

const app = createApp(App);
const store = createPinia();
app.use(store);
app.mount("#app");
```

## Pinia 选项式

store 仓库是存储 state 状态的容器

::: code-group

```ts
import { defineStore } from "pinia";
export const useUserStore /** 命名规范 useXxxStore */ = defineStore(
  "user", // storeId
  {
    state: () => ({
      name: "$reset",
      age: 1,
    }),
    // getters 类似计算属性, 也会缓存计算结果
    getters: {},
    // actions 中可以写同步/异步方法
    actions: {
      setDefaultSync() {
        ({ name: this.name, age: this.age } = { name: "default", age: 18 });
      },
      // 不能写箭头函数, 否则没有 this
      changeAge: function (delta: number) {
        this.age += delta;
      },
    },
  }, // options
);
```

```vue
<script lang="ts" setup>
import { useUserStore } from "@/stores";
// store 仓库是存储 state 状态的容器
const userStore = useUserStore(); // userStore 是一个 Proxy 代理对象
// 方式 1, 直接修改 state, 是响应式的
function addAge() {
  userStore.age++;
}

// 方式 2, 使用 store.$patch 修改部分 state
function statePatch() {
  // store.$patch 可以接收新的 state
  userStore.$patch({
    age: userStore.age + 1,
  });

  // store.$patch 也可以接收一个修改函数
  userStore.$patch((state) => {
    state.name += "!";
  });
}

// 方式 3, 使用 store.$state 修改全部 state
function totalChange() {
  userStore.$state = {
    age: userStore.age + 1,
    name: userStore.name + "!",
  };
}
</script>

<template>
  <h1>Pinia 选项式</h1>
  <div>age: {{ userStore.age }}, name: {{ userStore.name }}</div>
  <div class="box">
    <button @click="() => userStore.setDefaultSync()">setDefaultSync</button>
    <button @click="addAge">直接修改 state</button>
    <button @click="statePatch">修改部分 state</button>
    <button @click="totalChange">修改全部 state</button>
    <!-- 方式 4, 使用 action 修改 state -->
    <button @click="() => userStore.changeAge(1)">
      使用 action 修改 state
    </button>
  </div>
</template>

<style lang="css" scoped>
.box {
  display: flex;
  flex-direction: column;
  /** 单行, 侧轴起点对齐 */
  align-items: flex-start;
}
</style>
```

:::

## storeToRefs

直接解构会失去响应式, 使用 pinia 的 storeToRefs 解构可以保留响应式 (也可以使用 vue 的 toRef, toRefs)

```ts
// 直接解构会失去响应式
// const { age, name } = userStore;
// 使用 pinia 的 storeToRefs 解构可以保留响应式 (也可以使用 vue 的 toRef, toRefs)
const { age, name } = storeToRefs(userStore);
```

## actions 和 getters

> [!caution]
>
> - state 提供响应式数据, actions 提供操作响应式数据的方法
> - actions 中可以写同步/异步方法
> - getters 类似计算属性, 也会缓存计算结果

```ts
function fetchDefault(): Promise<{ name: string; age: number }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "default",
        age: 18,
      });
    }, 3000);
  });
}

export const useUserStore = defineStore(
  "user", // storeId
  {
    // ...
    // getters 类似计算属性, 也会缓存计算结果
    getters: {
      newName(): string {
        return `${this.name}__new`;
      },
    },
    // actions 中可以写同步/异步方法
    actions: {
      async setDefault() {
        ({ name: this.name, age: this.age } = await fetchDefault());
      },
    },
  }, // options
);
```

## store 仓库实例 API

- store.$patch 修改部分 state, 可以接收新的 state, 也可以接收一个修改函数
- store.$state 修改全部 state
- userStore.$reset store.$reset 重置 state 到初始状态 `userStore.$reset()`
- store.$subscribe 侦听 state 响应式数据的改变, state 改变时调用传入的 callback, 类似 watch
- store.$onAction 侦听 action 操作响应式数据的方法的调用, 调用 action 时调用传入的 callback

### store.$subscribe

`store.$subscribe((mutation, newState) => void)`

```ts
// store.$subscribe((mutation, newState) => void)
// mutation.event 副作用事件数组, 可以获取到新值 newValue 和旧值 oldValue 等
userStore.$subscribe(
  (mutation, newState) => {
    // debugger
    console.log(mutation, newState);
  } /** callback */,
  {
    detached: false, // detached: false 组件卸载时清除回调, 默认
    // 以下是 watch 侦听器的 WatchOptions
    deep: false, // 开启深层侦听
    immediate: false, // callback 默认懒执行
    flush: "pre", // 默认 state 更新前触发 callback
    // once: true // 一次性侦听器
  }, // options
);
```

### userStore.$onAction

- `store.$onAction(context => void)`
- context.after((actionReturnVal) => void) 接收 action 方法调用后的回调函数
- context.onError((err) => void) 接收 action 方法的错误回调函数
- context.args 获取 action 方法的参数数组
- context.store 获取 store 仓库实例

```ts
// store.$onAction(context => void)
userStore.$onAction(
  (context) => {
    // context.after((actionReturnVal) => void) 接收 action 方法调用后的回调函数
    context.after((ret) => {
      console.log("Action return value:", ret);
    });
    // context.onError((err) => void) 接收 action 方法的错误回调函数
    context.onError((err) => {
      console.error(err);
    });
    // context.args 获取 action 方法的参数数组
    console.log(context.args);
    // context.store 获取 store 仓库实例
    console.log(context.store === userStore); // true
  } /** callback */,
  false, // detached: false 组件卸载时清除回调, 默认
);
```

## Pinia 组合式 (使用 setup 语法)

> [!warning]
> 使用 setup 语法创建的 store 仓库实例未实现 $reset 方法, 需要手动实现

```ts
export const useUserStore2 = defineStore("user2", () => {
  // ********** state **********
  const name = ref("$reset");
  const age = ref(1);
  const foobar = reactive({ foo: "bar" });
  // ********** getters (使用计算属性) **********
  const newName = computed(() => `${name.value}__new`);
  // ********** actions **********
  const setDefaultSync: () => void = () => {
    // 对于 reactive 创建的响应式变量, 一定不能改变该变量的地址, 否则会失去响应式
    foobar.foo = "bar";
    ({ name: name.value, age: age.value } = { name: "default", age: 18 });
  };

  const changeAge: (delta: number) => void = (delta: number) => {
    age.value += delta;
  };
  // 使用 setup 语法创建的 store 仓库实例没有 $reset 方法, 需要手动实现
  const $reset: () => void = () => {
    [name.value, age.value, foobar.foo] = ["$reset", 1, "bar"];
  };
  // 一定要 return, 类比组件的 setup
  return {
    name, // Ref<string>
    age, // Ref<number>
    foobar, // Reactive<{ foo: string }>
    newName, // ComputedRef<string>
    setDefaultSync, // () => void
    changeAge, // (delta: number) => void
    $reset,
  };
}); // storeSetup 函数
```

```vue
<script lang="ts" setup>
import { useUserStore2 } from "@/stores";
const userStore2 = useUserStore2();
function totalChange() {
  userStore2.foobar.foo += "bar";
  userStore2.$state = {
    age: userStore2.age + 1,
    name: userStore2.name + "!",
    // 对于 reactive 创建的响应式变量, 一定不能改变该变量的地址, 否则会失去响应式
    // foobar: {
    //   foo: userStore.foobar.foo + 'bar',
    // }, // 会失去响应式
    foobar: userStore2.foobar, // 保留响应式
  };
}
</script>

<template>
  <h1>Pinia 组合式 (使用 setup 语法)</h1>
  <div>age: {{ userStore2.age }}, name: {{ userStore2.name }}</div>
  <div>foobar: {{ JSON.stringify(userStore2.foobar) }}</div>
  <div class="box">
    <button @click="() => userStore2.setDefaultSync()">setDefault</button>
    <button @click="totalChange">修改全部 state</button>
    <!-- 调用 action 修改 state -->
    <button @click="() => userStore2.changeAge(1)">
      调用 action 修改 state
    </button>
    <!-- getters -->
    <div>{{ userStore2.newName }}</div>
    <!-- 手动实现的 $reset -->
    <button @click="userStore2.$reset()">$reset</button>
  </div>
</template>

<style lang="css" scoped>
.box {
  display: flex;
  flex-direction: column;
  /** 单行, 侧轴起点对齐 */
  align-items: flex-start;
}
</style>
```

## Pinia 持久化

- Pinia 和 Vuex 的通病: 页面刷新后 state 状态丢失
- 解决: 编写 Pinia 持久化插件 (localStorage, sessionStorage)

对比 localStorage 和 sessionStorage

- localStorage: 数据存储到磁盘, 没有过期时间
- sessionStorage: 数据缓存到内存, 会话结束时, 自动清除数据

> [!caution]
>
> - 对于选项式语法创建的 store 仓库实例, 调用 toRaw(store.$state) 将 $state 转换为普通对象
> - 对于组合式语法创建的 store 仓库实例, 必须**递归**调用 toRaw(store.$state) 将 $state 转换为普通对象

```ts
export function deepToRaw(observed: any) {
  const isObject = (val: any) => val !== null && typeof val === "object";
  // unref(obj) 如果 obj 是 ref 创建的响应式对象, 则返回 obj.value; 否则直接返回 obj
  const val = isRef(observed) ? unref(observed) : observed;
  if (!isObject(val)) {
    return val;
  }
  if (Array.isArray(val)) {
    const rawArr: any[] = [];
    val.forEach((item) => {
      rawArr.push(deepToRaw(item));
    });
    return rawArr;
  }
  const rawObj: any = {};
  Object.keys(val).forEach((key) => {
    rawObj[key] = deepToRaw(val[key]);
  });
  return rawObj;
}
```

```ts
function setLocalStorage(key: string, value: unknown) {
  // debugger
  const rawValue = deepToRaw(value);
  // 对于选项式语法创建的 store 仓库实例, 调用 toRaw(store.$state) 将 $state 转换为普通对象
  // 对于组合式语法创建的 store 仓库实例, 必须递归调用 toRaw(store.$state) 将 $state 转换为普通对象
  localStorage.setItem(key, JSON.stringify(rawValue));
}

function getLocalStorage(key: string) {
  return localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key) as string)
    : {};
}

let callNum = 0;
function makePiniaPersistencePlugin(options?: {
  keyPrefix?: string;
}): PiniaPlugin {
  const { keyPrefix = "pinia" } = options ?? {}; // 解构赋值时指定默认值
  return (piniaCtx: PiniaPluginContext) => {
    // 有几个 store 仓库实例, 调用几次 pinia 插件函数
    console.log("callNum:", ++callNum);
    const key = `${keyPrefix}-${piniaCtx.store.$id}`;
    const props = getLocalStorage(key);
    console.log(
      `getLocalStorage, key: ${key}, value: ${JSON.stringify(props)}`,
    );
    // 侦听 state 响应式数据的改变, state 改变时调用传入的 callback, 类似 watch
    piniaCtx.store.$subscribe(() => {
      setLocalStorage(key, deepToRaw(piniaCtx.store.$state));
    });
    return props;
  };
}

const app = createApp(App);
const pinia = createPinia();
pinia.use(makePiniaPersistencePlugin());

app.use(pinia);
app.mount("#app");
```
