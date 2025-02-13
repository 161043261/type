<script lang="ts" setup>
import { reactive } from 'vue'

let games = reactive([
  { id: '1', name: 'Honkai Impact' },
  { id: '2', name: 'Genshin Impact' },
  { id: '3', name: 'Honkai: Star Rail' }
])
</script>

<template>
  <div class="child">
    <slot v-bind:funs="games"></slot>
    <slot :a="1" :b="2" name="s1" v-bind:funs="games"></slot>
  </div>
</template>

<style scoped>
.child {
  width: 300px;
  height: 300px;
  background-color: lightcyan;
  border-radius: 10px;
  box-shadow: 0 0 10px;
}
</style>
