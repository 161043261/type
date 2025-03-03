<script lang="ts" setup>
import { getCurrentInstance } from 'vue'
// getCurrentInstance 获取当前组件实例
const publisher = getCurrentInstance()

let flag = false

function pub() {
  flag = !flag
  publisher?.proxy?.$bus.emit('eventType', [flag, new Date().toLocaleTimeString()])
}
</script>

<template>
  <div>
    <em>MittPublish</em>
    <button @click="pub">发布</button>
  </div>
</template>

<style lang="css" scoped></style>
