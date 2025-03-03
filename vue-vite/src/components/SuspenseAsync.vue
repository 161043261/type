<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import { myAxios } from '@/utils/axios.ts'
// setup 语法糖中使用顶层 await, 会编译为 async setup()
const {
  characters: [albedo],
} = await myAxios.get<{ characters: Array<any> }>('./genshin-data.json')
</script>

<template>
  <h1>Suspense, defineAsyncComponent</h1>
  <div>name: {{ albedo.name }}</div>
  <div>description: {{ albedo.description }}</div>
</template>

<style lang="css" scoped></style>
