<script lang="ts" setup>
import { ref } from 'vue'

let popUp = ref(false)
</script>

<template>
  <button @click="popUp = true">open pop-up</button>
  <teleport to="body">
    <!-- teleport to HTML tag -->
    <div v-show="popUp" class="child">
      <p>pop-up title</p>
      <p>pop-up content</p>
      <button @click="popUp = false">close pop-up</button>
    </div>
  </teleport>
</template>

<style scoped>
.child {
  width: 200px;
  height: 200px;
  background-color: lightyellow;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  text-align: center;
  padding: 10px;
  position: fixed;
  left: 50%;
  top: 20px;
  margin-left: -100px;
}
</style>
