<script lang="ts" setup>
import { onActivated, onDeactivated, onMounted, onUnmounted, ref } from 'vue'

const text = ref('')

onMounted(() => {
  console.log('onMounted')
})

onActivated(() => {
  console.log('onActivated')
})

onDeactivated(() => {
  console.log('onDeactivated')
})

onUnmounted(() => {
  console.log('onUnmounted')
})
</script>

<template>
  <div>KeepAliveBoy</div>
  <el-input v-model="text" />
</template>

<style lang="css" scoped></style>
