<!-- <script setup lang="ts">
// import type { PropType } from 'vue'
// const props = defineProps({
//   name: { type: Array as PropType<string[]>, required: true },
// })
const props = defineProps<{
  name: string[]
}>()
</script> -->

<!-- 泛型支持 -->
<script generic="T /** extends object */" lang="ts" setup>
const props = defineProps<{
  name: T[]
}>()
console.log(props.name)
// const emit = defineEmits(['eventName'])
const emit = defineEmits<{
  // <eventName>: <expected arguments>
  // (eventName: string, arg: number, arg2: string): void;
  myGroupies: [arg: number, arg2: string] // 命名元组语法
}>()

defineOptions({
  // 属性和 Options API 相同
  // data, methods, render, ...
  name: 'VueMacroChild',
})
</script>

<template>
  <main>
    <button @click="emit('myGroupies', 1, 'arg')"></button>
  </main>
</template>

<style scoped lang="css"></style>
