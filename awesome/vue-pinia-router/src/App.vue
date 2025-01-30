<script setup lang="ts">
import PiniaDemo from './components/PiniaDemo.vue'
import PiniaDemo2 from './components/PiniaDemo2.vue'
import PiniaFoo from './components/PiniaFoo.vue'
import PiniaBar from './components/PiniaBar.vue'
import { RouterView } from 'vue-router'

function clearLocalStorage() {
  localStorage.clear() // 清除 localStorage 中的所有键值对
  location.reload() // 刷新当前页面
}
</script>

<template>
  <div>
    <!-- Vue3 Pinia -->
    <PiniaDemo />
    <PiniaDemo2 />
    <h1>Pinia 持久化插件</h1>
    <PiniaFoo />
    <PiniaBar />
    <button @click="clearLocalStorage">clearLocalStorage</button>
    <hr />
    <!-- Vue3 Router -->
    <!-- RouterLink 链接到 to 属性指定的路由 -->
    <RouterLink style="text-decoration: none; margin-left: 10px" to="/">Login</RouterLink>
    <RouterLink style="text-decoration: none; margin-left: 10px" to="/reg">Register</RouterLink>
    <!-- RouterView 路由匹配到的视图组件的容器 -->
    <RouterView></RouterView>
  </div>
</template>

<style lang="css">
* {
  font-family: 'Iosevka', 'Menlo', 'DejaVu Sans Mono', 'Cascadia Code', 'PingFang SC',
    'Microsoft YaHei', monospace;
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
