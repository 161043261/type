<script lang="ts" setup>
import {
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onRenderTracked,
  onRenderTriggered,
  onUnmounted,
  onUpdated,
  ref,
} from 'vue'
// setup 语法糖中, 将 beforeCreate, created 合并为 setup
const str = ref('text')
// 获取 DOM
const refName = ref<HTMLInputElement>()
console.log('[LifeCycle] setup 创建阶段', refName.value) // undefined

onBeforeMount(() => {
  console.log('[LifeCycle] onBeforeMount 挂载前', refName.value) // undefined
})
onMounted(() => {
  console.log('[LifeCycle] onMounted 挂载后', refName.value)
})
onBeforeUpdate(() => {
  console.log('[LifeCycle] onBeforeUpdate 更新前', refName.value?.innerText)
})
onUpdated(() => {
  console.log('[LifeCycle] onUpdated 更新后', refName.value?.innerText)
})
onBeforeUnmount(() => {
  console.log('[LifeCycle] onBeforeUnmounted 卸载前', refName.value)
})
onUnmounted(() => {
  console.log('[LifeCycle] onUnmounted 卸载后', refName.value) // null
})

// onRenderTriggered
onRenderTriggered((ev) => {
  console.log('[LifeCycle] onRenderTriggered:', ev) // 触发更新后
})

// onRenderTracked
onRenderTracked((ev) => {
  console.log('[LifeCycle] onRenderTracked:', ev) // 跟踪依赖后
})
// onRenderTriggered => onBeforeUpdated => onRenderTracked => onUpdated
</script>

<template>
  <div>
    <h1>生命周期钩子</h1>
    <p ref="refName">{{ str }}</p>
    <button @click="str += '!'">更新组件</button>
  </div>
</template>

<style lang="css" scoped></style>
