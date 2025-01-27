<script lang="ts" setup>
// const emit = defineEmits(['customEvent'])
const emit = defineEmits<{
  customEvent: [flag: boolean, timestamp: number] // 具名 tuple
}>()

let flag = false
function emitArgs() {
  flag = !flag
  emit('customEvent', flag, Date.now())
}
</script>

<template>
  <div>
    <!-- 点击按钮以触发自定义事件, 并向父组件发射参数 -->
    <button @click="emitArgs">emitArgs</button>
  </div>
</template>

<style lang="css" scoped></style>
