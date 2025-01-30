<script setup lang="ts">
import { useFooStore } from '@/stores'
const fooStore = useFooStore()
</script>

<template>
  <div class="">
    <em>********** fooStore **********</em>
    <div>fooStore.age: {{ fooStore.age }}, fooStore.name: {{ fooStore.name }}</div>
    <button @click="fooStore.changeAge(1)">changeAge</button>
    <button @click="fooStore.name += '!'">changeName</button>
  </div>
</template>

<style scoped lang="css"></style>
