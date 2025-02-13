<script setup lang="ts">
defineProps<{ item: { name: string; age: number } }>()
</script>

<template>
  <p>name: {{ item.name }}, age: {{ item.age }}</p>
</template>

<style scoped lang="css">
p {
  width: 200px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}
</style>
