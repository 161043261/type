<script lang="ts" setup>
defineProps(['title'])
</script>

<template>
  <div class="child">
    <p>{{ title }}</p>
    <slot></slot>
    <!-- name="default" -->
    <slot name="s1">s1</slot>
    <slot name="s2">s2</slot>
  </div>
</template>

<style scoped>
.child {
  background-color: lightcyan;
  border-radius: 10px;
  box-shadow: 0 0 10px;
  padding: 10px;
  width: 400px;
  height: 500px;
}

p {
  text-align: center;
}
</style>
