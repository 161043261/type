<script lang="ts" setup>
import { reactive, ref } from 'vue'
import ParentDemo from './ParentDemo.vue'

const a = ref(1)
const b = reactive({ v: 2 })
function addA(da: number) {
  a.value += da
}
</script>

<template>
  <div>
    <h1>$attrs, useAttrs</h1>
    <!-- v-bind="{ p1: "v1", p2: "v2" }" 等价于 :p1="v1" :p2="v2" -->
    <ParentDemo :a="a" :b="b" :addA="addA" :="{ p1: 'v1', p2: 'v2' }"></ParentDemo>
  </div>
</template>

<style lang="css" scoped></style>
