<script lang="ts" setup>
import { useAttrs } from 'vue'
import ChildDemo from './ChildDemo.vue'
const attrs = useAttrs()
</script>

<template>
  <div>
    <div>$attrs: {{ $attrs }}</div>
    <div>attrs: {{ attrs }}, $attrs === attrs: {{ $attrs === attrs }}</div>
    <ChildDemo :="$attrs"></ChildDemo>
    <ChildDemo :="attrs"></ChildDemo>
  </div>
</template>

<style lang="css" scoped></style>
