<script setup lang="ts">
import DefineSlotChild from './DefineSlotChild.vue'
const list = [
  {
    name: 'item1',
    age: 1,
  },
  {
    name: 'item2',
    age: 2,
  },
]
</script>

<template>
  <main>
    <DefineSlotChild :list="list">
      <!-- item 先通过子组件的 props 父传子,
      再通过子组件的 slot 子传父, v-slot 等价于 # -->
      <template #default="{ item, idx }">
        <div>{{ `idx: ${idx}, name: ${item.name}, age: ${item.age}` }}</div>
      </template>
    </DefineSlotChild>
  </main>
</template>

<style scoped lang="css"></style>
