<script setup lang="ts">
import { ref, watch } from 'vue'

const val = ref(0)
watch(val, (newVal, oldVal) => {
  console.log(newVal, '<==', oldVal) // watch 只执行一次
})
for (let i = 0; i < 1000; i++) {
  val.value = i // 更新 1000 次
}
</script>

<template>
  <main class="main">val: {{ val }}</main>
</template>

<style scoped lang="css">
.main {
  width: 200px;
  height: 200px;
  background: lightyellow;
}
</style>
