<script setup lang="ts">
import { PiniaDemo, PiniaDemo2, PiniaFoo, PiniaBar } from './components'
import { RouterView, useRouter } from 'vue-router'

function clearLocalStorage() {
  localStorage.clear() // 清除 localStorage 中的所有键值对
  location.reload() // 重新加载当前页面
}
const router = useRouter() // useRouter() 获取路由器对象, 等价于 template 中使用 $router
function routeJumpByURL(url: string) {
  // window.history.pushState();
  router.push(url) // 可以传递 URL 字符串
  // router.push({ path: url, replace: false }) // 也可以传递一个对象, 指定 URL
}
function routeJumpByName(name: string) {
  // window.history.replaceState();
  router.replace({ name, replace: true }) // 可以传递一个对象, 指定路由组件的名字
}
function prev(delta?: number) {
  router.go(delta ?? -1) // window.history.go(delta ?? -1);
  // router.back(); // window.history.back();
}
function next(delta?: number) {
  router.go(delta ?? 1) // window.history.go(delta ?? 1);
  // router.forward(); // window.history.forward();
}
</script>

<template>
  <div>
    <!-- Vue3 Router -->
    <!-- RouterLink 链接到 to 属性指定的路由 -->
    <!-- RouterLink 默认使用 history.pushState() -->
    <RouterLink :to="{ name: 'Login' }" style="padding-left: 10px">Login</RouterLink>
    <!-- 指定 RouterLink 使用 history.replaceState() -->
    <RouterLink :replace="true" :to="{ name: 'Register' }" style="padding-left: 10px"
      >Register</RouterLink
    >
    <!-- :replace="true" 可以简写为 replace -->
    <!-- <RouterLink replace :to="{ name: 'Register' }">Register</RouterLink> -->
    <!-- RouterView 路由组件的容器 -->

    <!-- <RouterView></RouterView> 等价于 -->
    <!-- Component inside <Transition> renders non-element root node that cannot be animated.  -->

    <RouterView v-slot="{ route, Component }">
      <!-- Transition 只允许一个直接子元素
     Transition 包裹组件时, 组件必须有唯一的根元素, 否则不能被动画化 -->
      <Transition
        :enter-active-class="`animate__animated ${route.meta.transition ?? 'animate__bounceIn'}`"
      >
        <component :is="Component"></component>
      </Transition>
    </RouterView>

    <!-- @/App.vue -->
    <!--<template>
          <RouteChildComponent>
            <template v-slot="{ route, Component }">
              <component :is="Component"></component>
            </template>
          </RouteChildComponent>
        </template> -->

    <!-- 路由子组件 -->
    <!--<template>
          <slot></slot>
        </template> -->

    <button @click="routeJumpByURL('/')">jumpToLoginByURL</button>
    <button @click="routeJumpByURL('/register')">jumpToRegisterByURL</button>
    <button @click="routeJumpByName('Login')">jumpToLoginByName</button>
    <button @click="routeJumpByName('Register')">jumpToRegisterByName</button>
    <button @click="prev()">prev</button>
    <button @click="next()">next</button>

    <!-- Vue3 Pinia -->
    <div v-if="$route.path === '/'">
      <hr />
      <PiniaDemo />
      <PiniaDemo2 />
      <h1>Pinia 持久化插件</h1>
      <PiniaFoo />
      <PiniaBar />
      <button @click="clearLocalStorage">clearLocalStorage</button>
    </div>
  </div>
</template>

<style lang="css">
* {
  font-family:
    'Menlo', 'DejaVu Sans Mono', 'Cascadia Code', 'PingFang SC', 'Microsoft YaHei', monospace;
}

button {
  border-radius: 10px;
  border: 1px solid lightpink;
  background-color: white;
  padding: 10px;
  cursor: pointer;
  transition: 0.5s all;
}

button:hover {
  box-shadow: 0 0 5px lightpink;
}
</style>
