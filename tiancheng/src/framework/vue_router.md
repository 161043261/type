# Vue3 路由

## 使用 vue-router

- RouterLink 链接到 to 属性指定的路由
- RouterView 内置组件, 路由组件的容器
- useRoute() 获取路由对象, 等价于 template 中使用 $route
- useRouter() 获取路由器对象, 等价于 template 中使用 $router

::: code-group

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
    path: "/register",
    // 异步导入的路由组件, 分开打包
    component: () => import("@/views/RegisterView.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes, // routes: routes
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
    <RouterLink style="margin-left: 10px" to="/">Login</RouterLink>
    <RouterLink style="margin-left: 10px" to="/register">Register</RouterLink>
    <!-- RouterView 路由组件的容器 -->
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

`<RouterLink to='/'></RouterLink>` 和 `<a href='/'></a>` 的区别

1. `<RouterLink>` 在 hash 模式和 history 模式下的行为相同
2. `<RouterLink>` 会阻止 `<a>` 标签的默认行为, 不会重新加载页面

## 路由模式

| 路由模式                                     | vue-router 4                      | vue-router 3      |
| -------------------------------------------- | --------------------------------- | ----------------- |
| history 模式 (HTML5 模式, 推荐)              | `history: createWebHistory()`     | `mode: 'history'` |
| hash 模式 (#, 对 SEO 不友好)                 | `history: createWebHashHistory()` | `mode: 'hash'`    |
| Memory 模式, 适合 node 环境和 SSR 服务端渲染 | `history: createMemoryHistory()`  |                   |

### hash 模式

`location.hash` 是 URL 中 hash(#) 和后面的部分, 例 `http://localhost:5173/framework/vue#sfc`, `location.hash = '#sfc'`, 改变 URL 中的 hash 值不会引起页面的重新加载, 通常用于单页面内的导航

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
2. 改变 `location.hash` 的值, 不会引起页面的重新加载
3. 点击浏览器的前进/后退按钮
4. 点击 `<a>` 标签 (例 `<RouterLink>` 默认渲染为 `<a>` 标签)
5. 调用 `history.pushState(), history.replaceState()`, 不会引起页面的重新加载
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
location.href = "http://localhost:5173/framework/vue"; // 页面重新加载
console.log(history.length); // 2

history.pushState(
  { state: 1 } /** state */,
  "" /** unused */,
  "push" /** url */,
);
console.log(history.length); // 3
console.log(location.href); // http://localhost:5173/framework/push

history.pushState({}, "", "/push");
console.log(history.length); // 4
console.log(location.href); // http://localhost:5173/push

location.href = "http://localhost:5173/framework/vue"; // 页面重新加载
console.log(history.length); // 5

history.replaceState({}, "", "replace");
console.log(history.length); // 5
console.log(location.href); // http://localhost:5173/framework/replace

history.replaceState({}, "", "/replace");
console.log(history.length); // 5
console.log(location.href); // http://localhost:5173/replace
```

路由组件可以有一个唯一的名字

```ts
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Login", // 指定路由的名字
    component: LoginView, // 合并打包
  },
  {
    path: "/register",
    name: "Register", // 指定路由的名字
    component: () => import("@/views/RegisterView.vue"), // 异步导入的路由组件, 分开打包
  },
];

export default createRouter({
  history: createWebHistory(),
  routes, // routes: routes
}); // options
```

## 命名路由

```vue
<template>
  <!-- RouterLink 默认使用 history.pushState() -->
  <RouterLink :to="{ name: 'Login' }">Login</RouterLink>
  <!-- 指定 RouterLink 使用 history.replaceState() -->
  <RouterLink :replace="true" :to="{ name: 'Register' }">Register</RouterLink>
  <!-- :replace="true" 可以简写为 replace -->
  <!-- <RouterLink replace :to="{ name: 'Register' }">Register</RouterLink> -->
</template>
```

## 编程式导航

- `router.push` 向 history 栈顶添加一条记录
- `router.replace` 替换 history 栈顶的记录

```vue
<script lang="ts" setup>
const router = useRouter(); // useRouter() 获取路由器对象, 等价于 template 中使用 $router

function routeJumpByURL(url: string) {
  // window.history.pushState();
  router.push(url); // 可以传递 URL 字符串
  // router.push({ path: url, replace: false }) // 可以传递一个对象, 指定 URL
}
function routeJumpByName(name: string) {
  // window.history.replaceState();
  router.replace({ name, replace: true }); // 可以传递一个对象, 指定路由组件的名字
}
function prev(delta?: number) {
  router.go(delta ?? -1); // window.history.go(delta ?? -1);
  // router.back(); // window.history.back();
}
function next(delta?: number) {
  router.go(delta ?? 1); // window.history.go(delta ?? 1);
  // router.forward(); // window.history.forward();
}
</script>

<template>
  <div>
    <button @click="routeJumpByURL('/')">jumpToLoginByURL</button>
    <button @click="routeJumpByURL('/register')">jumpToRegisterByURL</button>
    <button @click="routeJumpByName('Login')">jumpToLoginByName</button>
    <button @click="routeJumpByName('Register')">jumpToRegisterByName</button>
    <button @click="prev()">prev</button>
    <button @click="next()">next</button>
  </div>
</template>
```

## 路由传参

- query: URL 查询参数 (URL query parameters)
- params: URL 路径参数 (URL path parameters)

::: code-group

```ts [@/router/index.ts]
const routes: Array<RouteRecordRaw> = [
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/RegisterView.vue"),
  },
  {
    path: "/register/:id", // id: URL 路径参数, 必须传递
    name: "RegisterWithId",
    component: () => import("@/views/RegisterView.vue"),
  },
];
```

```ts [LoginView]
type Item = {
  name: string;
  price: number;
  id: number;
};

const router = useRouter();

// 路由传参
// 1. 使用 Pinia 缓存
// 2. query: URL 查询参数 (URL query parameters)
// 3. state
// 4. 路由前置守卫
function routeJumpByQuery(item: Item) {
  router.push({
    path: "/register",
    // name: 'Register', // 不需要指定路由组件的名字
    // query: URL 查询参数 http://localhost:5173/register?name=item1&price=1000&id=1
    query: item,
    state: item, // window.history.state = item
  });
}

// 5. params: URL 路径参数 (URL path parameters)
function routeJumpByParams(item: Item) {
  router.push({
    name: "RegisterWithId", // 必须指定路由组件的名字
    // params: URL 路径参数 http://localhost:5173/register/1
    params: {
      id: item.id,
    },
  });
}
```

```vue [RegisterView]
<script setup lang="ts">
import { isProxy } from "vue";
import { useRoute } from "vue-router";
import { data } from "../assets/list.json";

const { name, price, id } = history.state;
console.log(`name: ${name}, price: ${price}, id: ${id}`);

const route = useRoute(); // useRoute() 获取路由对象, 等价于 template 中使用 $route
console.log(isProxy(route)); // true
</script>

<template>
  <div class="register">Register</div>
  <div>
    route.query.name:
    {{
      route.query.name ??
      data.find((val) => val.id === Number(route.params.id))?.name
    }}
  </div>
  <div>
    route.query.price:
    {{
      route.query.price ??
      data.find((val) => val.id === Number(route.params.id))?.price
    }}
  </div>
  <!-- query: URL 查询参数 (URL query parameters)
       params: URL 路径参数 (URL path parameters) -->
  <div>route.query.id: {{ route.query.id ?? route.params.id }}</div>
</template>
```

:::

### 嵌套路由
