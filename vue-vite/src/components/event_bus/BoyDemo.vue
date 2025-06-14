<script lang="ts" setup>
// const emit = defineEmits(['customEvent'])
const emit = defineEmits<{
  customEvent: [flag: boolean, timeStr: string] // 具名元组
}>()

let flag = false
function emitArgs() {
  flag = !flag
  emit('customEvent', flag, new Date().toLocaleTimeString())
}
</script>

<template>
  <div>
    <!-- 点击按钮以触发自定义事件, 向父组件发射参数 -->
    <button @click="emitArgs">emitArgs</button>
  </div>
</template>

<style lang="css" scoped></style>
