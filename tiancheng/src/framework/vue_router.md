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

## 编程式路由

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

1. 使用 Pinia 缓存
2. query: URL 查询参数 (URL query parameters)
3. state
4. 路由前置守卫
5. params: URL 路径参数 (URL path parameters)

::: code-group

```ts [@/router/index.ts]
const routes: Array<RouteRecordRaw> = [
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/RegisterView.vue"),
  },
  {
    path: "/register/:id", // id: URL 路径参数
    // :id 必传参数, :name? :price? 可选参数
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

### 布尔模式

props 是一个布尔值时, `props: true`, 将 route.params 设置为路由组件的 props

对于有命名视图的路由: `props: { default: true, nameB: true, nameC: false }`

### 对象模式

props 是一个对象时, `props: { foo: 1 }`, 将该对象 `{ foo: 1 }` 设置为路由组件的 props

### 函数模式

props 是一个函数时, `props: (route) => route.query`, 将该函数的返回值设置为路由组件的 props

### 使用 RouterView 插槽传递参数

```vue
<template>
  <!-- RouterView 插槽 -->
  <RouterView v-slot="{ Component }">
    <!-- 使用 RouterView 插槽传递 propKey -->
    <component :is="Component" propKey="propVal"></component>
  </RouterView>
</template>
```

## 嵌套路由

::: code-group

```ts{13,14} [@/router/index.ts]
const routes: Array<RouteRecordRaw> = [
  {
    path: "/root",
    component: () => import("../views/RootView.vue"),
    children: [
      {
        path: "",
        name: "RootLogin",
        component: () => import("@/views/LoginView.vue"),
      },
      {
        path: "register",
        // path: "register", 实际路由 "/root/register"
        // path: "/register", 实际路由 "/register"
        name: "RootRegister",
        component: () => import("@/views/RegisterView.vue"),
      },
    ],
  },
];
```

```vue [RootView.vue]
<template>
  <div class="root">
    <h1>Root 父路由组件</h1>
    <RouterView></RouterView>
    <!-- 必须加上 /root 父路由前缀 -->
    <RouterLink style="margin-left: 10px" to="/root">RootLogin</RouterLink>
    <RouterLink style="margin-left: 10px" to="/root/register"
      >RootRegister</RouterLink
    >
  </div>
</template>
```

:::

## 命名视图

RouterView 的 name 属性

::: code-group

```ts{6,7} [@/router/index.ts]
const routes: Array<RouteRecordRaw> = [
  // 命名视图
  {
    path: "/container",
    component: () => import("@/views/ViewsContainer.vue"),
    redirect: '/container/ab', // 路由重定向
    alias: '/views/container', // 路由别名
    children: [
      {
        path: "ab",
        name: 'AB',
        components: {
          default: () => import("@/views/NameA.vue"), // 视图名 default
          nameB: () => import("@/views/NameB.vue"), // 视图名 nameB
        },
      },
      {
        path: "bc",
        name: 'BC',
        components: {
          nameB: () => import("@/views/NameB.vue"), // 视图名 nameB
          nameC: () => import("@/views/NameC.vue"), // 视图名 nameC
        },
      },
    ],
  },
];
```

```vue [ViewsContainer.vue]
<template>
  <div style="background: azure">
    <div>name: default (视图 @/views/NameA 的容器)</div>
    <!-- name="default" -->
    <RouterView></RouterView>
    <div>name: nameB (视图 @/views/NameB 的容器)</div>
    <RouterView name="nameB"></RouterView>
    <div>name: nameC (视图 @/views/NameC 的容器)</div>
    <RouterView name="nameC"></RouterView>
    <RouterLink to="/container/ab">AB</RouterLink>
    <RouterLink to="/container/bc">BC</RouterLink>
  </div>
</template>
```

:::

## 路由重定向, 路由别名

- 路由重定向 redirect
- 路由别名 alias

```ts
const routes: Array<RouteRecordRaw> = [
  {
    path: "/container",
    component: () => import("@/views/ViewsContainer.vue"),
    // redirect: '/container/ab', // 路由重定向

    // redirect: {
    //   path: '/container/ab',
    //   // name: 'AB',
    // },

    // http://localhost:5173/container?k=v
    // 重定向到 http://localhost:5173/container/ab?k=v
    redirect: (to) => {
      console.log("to:", to);
      // return '/container/ab'

      return {
        // path: '/container/ab',
        name: "AB",
        query: to.query, // 默认
      };
    },

    // alias: '/views/container', // 路由别名
    alias: ["/ViewsContainer", "/views/container"],
    // http://localhost:5173/ViewsContainer?k=v // 不区分大小写
    // http://localhost:5173/views/container?k=v
    // 都重定向到 http://localhost:5173/container/ab?k=v
  },
];
```

## 路由守卫

### 前置守卫

### 后置守卫
