<script lang="ts" setup>
import { useFooStore } from '@/stores'
const foo = useFooStore()
</script>

<template>
  <div>age: {{ foo.age }}, name: {{ foo.name }}</div>
</template>

<style lang="css" scoped></style>
