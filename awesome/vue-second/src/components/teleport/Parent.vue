<script lang="ts" setup>
import Child from './Child.vue'
</script>

<template>
  <div class="parent">
    <p><em>***** teleport *****</em></p>
    <img alt="avatar.jpg" src="/avatar.jpg" />
    <hr />
    <Child />
  </div>
</template>

<style scoped>
.parent {
  background-color: lightgreen;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
  /* absolute positioning of pop-up fails
   solution: using teleport */
  filter: saturate(100%);
}

img {
  width: 400px;
}
</style>
