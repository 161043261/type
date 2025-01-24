<script lang="ts" setup>
import { useAttrs } from 'vue'
import Child from './Child.vue'

const attrs = useAttrs()
</script>

<template>
  <div class="parent">
    <p>@/views/communicate/$attr/Parent.vue</p>
    <p>$attrs: {{ $attrs }}</p>
    <!-- { "a": 1, "b": 2, "c": 3, "d": 4, "x": 5, "y": 6 } -->
    <p>attrs: {{ attrs }}</p>
    <!-- { "a": 1, "b": 2, "c": 3, "d": 4, "x": 5, "y": 6 } -->
    <Child v-bind="$attrs" />
    <Child v-bind="attrs" />
  </div>
</template>

<style scoped>
.parent {
  margin-top: 20px;
  background-color: lightblue;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px black;
}
</style>
