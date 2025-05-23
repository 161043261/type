<script lang="ts" setup>
import { markRaw, reactive, ref } from 'vue'

// markRaw 设置 __skip__ = true, 跳过 proxy 代理
const user = markRaw({
  age: 22,
}) // user 不会被代理
const reactiveUser = reactive(user)
const refUser = ref(user)
function addAge() {
  refUser.value.age++
  // 数据 (模型) 更新不会导致视图更新, 失去响应式
  console.log('[MarkRaw] user.age:', user.age)
}
</script>

<template>
  <div>{{ `reactiveUser.age: ${reactiveUser.age}` }}</div>
  <div>{{ `refUser.age: ${refUser.age}` }}</div>
  <button @click="addAge">addAge</button>
</template>

<style lang="css" scoped></style>
