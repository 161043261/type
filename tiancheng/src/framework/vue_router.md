# Vue3 路由

## 使用 vue-router

- RouterLink 链接到 to 属性指定的路由
- RouterView 内置组件, 路由匹配到的视图组件的容器

::: code-group

```vue [LoginView.vue]
<!-- @/views/LoginView.vue -->
<template>
  <div class="login">Login</div>
</template>

<style scoped lang="css">
.login {
  background: lightpink;
  width: 200px;
  height: 200px;
  font-size: 3rem;
  color: #fff;
}
</style>
```

```vue [RegisterView.vue]
<!-- @/views/RegisterView.vue -->
<template>
  <div class="register">Register</div>
</template>

<style scoped lang="css">
.register {
  background: lightblue;
  width: 200px;
  height: 200px;
  font-size: 3rem;
  color: #fff;
}
</style>
```

```ts [index.ts]
// @/router/index.ts
import LoginView from "@/views/LoginView.vue";
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: LoginView, // 合并打包
  },
  {
    path: "/reg",
    component: () => import("@/views/RegisterView.vue"), // 异步导入的路由组件, 分开打包
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
}); // options

export default router;
```

```vue [App.vue]
<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div>
    <!-- RouterLink 链接到 to 属性指定的路由 -->
    <RouterLink style="text-decoration: none; margin-left: 10px" to="/"
      >Login</RouterLink
    >
    <RouterLink style="text-decoration: none; margin-left: 10px" to="/reg"
      >Register</RouterLink
    >
    <!-- RouterView 路由匹配到的视图组件的容器 -->
    <RouterView></RouterView>
  </div>
</template>
```

```ts [main.ts]
// @/main.ts
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(router);
app.mount("#app");
```

:::

## 路由模式

| 路由模式                                     | vue-router 4                      | vue-router 3      |
| -------------------------------------------- | --------------------------------- | ----------------- |
| HTML5 模式 (history 模式, 推荐)              | `history: createWebHistory()`     | `mode: 'history'` |
| hash 模式 (#, 对 SEO 不友好)                 | `history: createWebHashHistory()` | `mode: 'hash'`    |
| Memory 模式, 适合 node 环境和 SSR 服务端渲染 | `history: createMemoryHistory()`  |                   |

### hash 模式

`location.hash` 是 URL 中 hash(#) 和后面的部分, 例 `http://localhost:5173/framework/vue#sfc`, `location.hash = '#sfc'`, 改变 URL 中的 hash 值不会引起页面刷新, 通常用于单页面内的导航

> [!warning] hash 模式和 hashchange 事件
>
> - Vue3 路由的 hash 模式通过改变 `location.hash` 的值, 触发 hashchange 事件
> - vue-router 监听 hashchange 事件, 实现无刷新的路由跳转, 对 SEO 不友好

```js
addEventListener("hashchange", (ev) => {
  console.log(ev);
});
```

#### 改变 URL 的方式

1. 改变 `location.href` 的值
2. 改变 `location.hash` 的值, 不会引起页面刷新
3. 点击浏览器的前进/后退按钮
4. 点击 `<a>` 标签 (例 `<RouterLink>` 默认渲染为 `<a>` 标签)
5. 调用 `history.pushState(), history.replaceState()`, 不会引起页面刷新
6. 调用 `history.back(), history.go(delta: number), history.forward()`, 等价于 3.

### HTML5 模式 (history 模式)

> [!warning] HTML5 模式 (history 模式) 和 popstate 事件
>
> - 点击浏览器的前进/后退按钮改变 URL 时, 会触发 popstate 事件
> - 点击 `<a>` 标签, 或调用 `history.pushState(), history.replaceState()` 改变 URL 时, 不会触发 popstate 事件
> - vue-router 拦截 `<a>` 标签的点击事件和 `history.pushState(), history.replaceState()` 的调用, 调用 `history.back(), > history.go(delta: number), history.forward()` 触发 popstate 事件
> - vue-router 监听 popstate 事件, 实现无刷新的路由跳转

```js
addEventListener("popstate", (ev) => {
  console.log(ev);
});
```

```js
location.href = "http://localhost:5173/framework/vue"; // 页面刷新
console.log(history.length); // 2

history.pushState({} /** state */, "" /** unused */, "push" /** url */);
console.log(history.length); // 3
console.log(location.href); // http://localhost:5173/framework/push

history.pushState({}, "", "/push");
console.log(history.length); // 4
console.log(location.href); // http://localhost:5173/push

location.href = "http://localhost:5173/framework/vue"; // 页面刷新
console.log(history.length); // 5

history.replaceState({}, "", "replace");
console.log(history.length); // 5
console.log(location.href); // http://localhost:5173/framework/replace

history.replaceState({}, "", "/replace");
console.log(history.length); // 5
console.log(location.href); // http://localhost:5173/replace
```
