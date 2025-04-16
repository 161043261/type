<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import { getCurrentInstance, ref } from 'vue'

const flag = ref(false)
const timeStr = ref('mitt')

const curInstance = getCurrentInstance()
function sub() {
  // eventType === "eventType", 订阅指定类型的事件
  // 回调函数的第一个参数是发布的消息数组
  curInstance?.proxy?.$bus.on('eventType', (args: any) => {
    console.log('args:', args)
    ;[flag.value, timeStr.value] = args
  })

  // eventType === '*', 订阅所有类型的事件
  // 回调函数的第一个参数是事件类型, 第二个参数是发布的消息数组
  // curInstance?.proxy?.$bus.on('*', (eventType, args) => {
  //   console.log("eventType:", eventType);
  //   console.log("args:", args)
  // })
}

function unsub() {
  curInstance?.proxy?.$bus.off('eventType')
}

function unsubAll() {
  curInstance?.proxy?.$bus.all.clear()
}
</script>

<template>
  <em>MittSubscribe</em>
  <div>flag: {{ flag }}, timeStr: {{ timeStr }}</div>
  <button @click="sub">订阅</button>
  <button @click="unsub">取消订阅</button>
  <button @click="unsubAll">取消所有订阅</button>
</template>

<style lang="css" scoped></style>
