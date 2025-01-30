<script setup lang="ts">
import { useBarStore } from '@/stores'
const barStore = useBarStore()
</script>

<template>
  <div class="">
    <em>********** barStore **********</em>
    <div>barStore.age: {{ barStore.age }}, barStore.name: {{ barStore.name }}</div>
    <button @click="barStore.changeAge(1)">changeAge</button>
    <button @click="barStore.name += '!'">changeName</button>
  </div>
</template>

<style scoped lang="css"></style>
