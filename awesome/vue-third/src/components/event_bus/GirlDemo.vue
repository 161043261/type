<script lang="ts" setup>
defineProps<{
  flag: boolean
  timeStr: string
}>()
</script>

<template>
  <div>
    <div>flag: {{ flag }}</div>
    <div>timeStr: {{ timeStr }}</div>
  </div>
</template>

<style lang="css" scoped></style>
