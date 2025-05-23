<script lang="ts" setup>
import { ref } from 'vue'
import bus from './bus'

const flag = ref(false)
const timeStr = ref('方式 2: 事件总线 (手写发布/订阅 pub/sub)')

bus.subscribe('customEvent', (flag_: boolean, timeStr_: string) => {
  flag.value = flag_
  timeStr.value = timeStr_
})
</script>

<template>
  <div>
    <div>flag: {{ flag }}</div>
    <div>timeStr: {{ timeStr }}</div>
  </div>
</template>

<style lang="css" scoped></style>
