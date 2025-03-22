<script setup lang="ts">
import { ElInput } from 'element-plus'
import { ref } from 'vue'
const ipt = ref('')
</script>

<template>
  <main>
    <ElInput v-model:model-value="ipt">尽情的输入</ElInput>
  </main>
</template>

<style scoped lang="css">
.el-input__inner {
  background: lightpink;
}

:deep(.el-input__inner) {
  background: lightblue;
}
</style>
