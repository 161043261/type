<script lang="ts" setup>
import { useUserStore } from '@/stores'
// store 仓库是存储 state 状态的容器
const userStore = useUserStore() // userStore 是一个 Proxy 代理对象
// 方式 1, 直接修改 state, 是响应式的
function addAge() {
  userStore.age++
}

// 方式 2, 使用 store.$patch 修改部分 state
function statePatch() {
  // store.$patch 可以接收新的 state
  userStore.$patch({
    age: userStore.age + 1,
  })

  // store.$patch 也可以接收一个修改函数
  userStore.$patch((state) => {
    state.name += '!'
  })
}

// 方式 3, 使用 store.$state 修改全部 state
function totalChange() {
  userStore.$state = {
    age: userStore.age + 1,
    name: userStore.name + '!',
  }
}

// 直接解构会失去响应式
// const { age, name } = userStore;
// 使用 pinia 的 storeToRefs 解构可以保留响应式 (也可以使用 vue 的 toRef, toRefs)
// const { age, name } = storeToRefs(userStore);

/**
 * ********************
 * store 仓库实例 API *
 * ********************
 */

// store.$subscribe((mutation, newState) => void)
// mutation.event 副作用事件数组, 可以获取到新值 newValue 和旧值 oldValue 等
userStore.$subscribe(
  (mutation, newState) => {
    // debugger
    console.log(mutation, newState)
  } /** callback */,
  {
    detached: false, // detached: false 组件卸载时清除回调, 默认
    // 以下是 watch 侦听器的 WatchOptions
    deep: false, // 开启深层侦听
    immediate: false, // callback 默认懒执行
    flush: 'pre', // 默认 state 更新前触发 callback
    // once: true // 一次性侦听器
  }, // options
)

// store.$onAction(context => void)
userStore.$onAction(
  (context) => {
    // context.after((actionReturnVal) => void) 接收 action 方法调用后的回调函数
    context.after((ret) => {
      console.log('Action return value:', ret)
    })
    // context.onError 接收 action 方法的错误回调函数
    context.onError((err) => {
      console.error(err)
    })
    // context.args 返回 action 方法的参数数组
    console.log(context.args)
    // context.store 返回 store 仓库实例
    console.log(context.store === userStore) // true
  } /** callback */,
  false, // detached: false 组件卸载时清除回调, 默认
)
</script>

<template>
  <h1>Pinia 选项式</h1>
  <div>age: {{ userStore.age }}, name: {{ userStore.name }}</div>
  <div class="box">
    <button @click="() => userStore.setDefaultSync()">setDefaultSync</button>
    <button @click="() => userStore.setDefault()">setDefault</button>
    <button @click="addAge">直接修改 state</button>
    <button @click="statePatch">修改部分 state</button>
    <button @click="totalChange">修改全部 state</button>
    <!-- 方式 4, 调用 action 修改 state -->
    <button @click="() => userStore.changeAge(1)">调用 action 修改 state</button>
    <!-- getters -->
    <div>{{ userStore.newName }}</div>
    <!-- store 仓库实例 API -->
    <button @click="userStore.$reset()">$reset</button>
  </div>
</template>

<style lang="css" scoped>
.box {
  display: flex;
  /* flex-direction: column; */
  /** 单行, 侧轴起点对齐 */
  /* align-items: flex-start; */
}
</style>
