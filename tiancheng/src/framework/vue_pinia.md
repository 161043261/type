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

### 初始化 Pinia 仓库

::: code-group

```ts
import { defineStore } from "pinia";
import { StoreNames } from "./store_names";
export const useFooStore /** 命名规范 useXxxStore */ = defineStore(
  StoreNames.FOO, // storeId
  {
    state: () => ({
      age: 23,
      name: "yukino",
    }),
    // 类似计算属性, 也会缓存计算结果
    getters: {},

    actions: {
      muteAge(delta: number) {
        // 不能写箭头函数, 否则没有 this
        this.age += delta;
      },
    },
  }, // options
);
```

```vue
<script lang="ts" setup>
import { useFooStore } from "@/stores";
const fooStore = useFooStore(); // store 是存储 state 的容器

// 方式 1, 直接修改 state, 是响应式的
function addAge() {
  fooStore.age++;
}

// 方式 2, 使用 store.$patch 修改部分 state
function statePatch() {
  // store.$patch 可以接收新的 state
  fooStore.$patch({
    age: fooStore.age + 1,
  });

  // store.$patch 也可以接收一个修改函数
  fooStore.$patch((state) => {
    state.name += "!";
  });
}

// 方式 3, 使用 store.$state 修改全部 state
function totalMute() {
  fooStore.$state = {
    age: fooStore.age + 1,
    name: fooStore.name + "!",
  };
}
</script>

<template>
  <div>age: {{ fooStore.age }}, name: {{ fooStore.name }}</div>
  <div class="box">
    <button @click="addAge">直接修改 state</button>
    <button @click="statePatch">修改部分 state</button>
    <button @click="totalMute">修改全部 state</button>
    <!-- 方式 4, 使用 action 修改 state -->
    <button @click="() => fooStore.muteAge(1)">使用 action 修改 state</button>
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
