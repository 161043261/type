<script setup lang="ts">
import VueMacroChild from './VueMacroChild.vue'
</script>

<template>
  <main>
    <VueMacroChild :name="['whoami']" @my-groupies="(...args) => console.log(args)"></VueMacroChild>
  </main>
</template>

<style scoped lang="css"></style>
