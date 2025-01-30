# Vue3 路由

## 使用 vue-router

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

```ts [main.ts]
// @/main.ts
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(router);
app.mount("#app");
```

## 路由模式

:::

| mode           | Vue2     | Vue3                 |
| -------------- | -------- | -------------------- |
| 历史记录       | history  | createWebHistory     |
| 哈希           | hash     | createWebHashHistory |
| SSR 服务端渲染 | abstract | createMemoryHistory  |
