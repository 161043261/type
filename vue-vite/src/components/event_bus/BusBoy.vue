<script lang="ts" setup>
import bus from './bus'

let flag = false
function emitArgs() {
  flag = !flag
  bus.publish('customEvent', flag, new Date().toLocaleTimeString()) // 发布
}
</script>

<template>
  <div>
    <button @click="emitArgs">emitArgs</button>
  </div>
</template>

<style lang="css" scoped></style>
