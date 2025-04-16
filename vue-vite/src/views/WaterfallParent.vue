<script lang="ts" setup>
import { reactive } from 'vue'
import WaterfallChild from './WaterfallChild.vue'

// 瀑布流
// const list: { h: number; bg: string }[] = []
const list: { h: number; bg: string }[] = reactive([])

const colors = [
  'lightblue',
  'lightcoral',
  'lightcyan',
  'lightgreen',
  'lightpink',
  'lightsalmon',
  'lightseagreen',
  'lightskyblue',
  'lightsteelblue',
  'lightyellow',
]

for (let i = 0; i < 50; i++) {
  list.push({
    h: Math.floor(Math.random() * 400) + 100,
    bg: colors[Math.floor(Math.random() * 10)],
  })
}
</script>

<template>
  <div>
    <button @click="(list.shift(), console.log(list.length))">shift左删</button>
    <WaterfallChild :list="list"></WaterfallChild>
  </div>
</template>

<style lang="css" scoped></style>
