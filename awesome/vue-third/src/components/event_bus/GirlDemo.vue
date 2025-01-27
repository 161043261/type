<script lang="ts" setup>
defineProps<{
  flag: boolean
  timestamp: number
}>()
</script>

<template>
  <div>
    <div>flag: {{ flag }}</div>
    <div>timestamp: {{ timestamp }}</div>
  </div>
</template>

<style lang="css" scoped></style>
