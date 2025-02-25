<script lang="ts" setup>
import Child from './Child.vue'
</script>

<template>
  <div class="parent">
    <p>@/views/communicate/provide-inject/Parent.vue</p>
    <Child />
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
