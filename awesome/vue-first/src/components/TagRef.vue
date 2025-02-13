<script lang="ts" setup>
import { ref } from 'vue'

let htmlTagRef = ref() // htmlTagRef -> <p ref="htmlTagRef">tag ref</p>
function htmlTagRefLog() {
  console.log(htmlTagRef.value)
}

let a = ref(0)
let b = ref(1)
let c = ref(2)
defineExpose({ a: a.value, b: b.value, c: c.value }) // user-defined expose
</script>

<template>
  <div class="tagRef">
    <p ref="htmlTagRef">tag ref</p>
    <!-- htmlTagRef: scoped id -->
    <button @click="htmlTagRefLog">htmlTagRefLog</button>
    <slot></slot>
  </div>
</template>

<style scoped>
/* scoped stylesheet */
.tagRef {
  background-color: lightblue;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}

button {
  margin: 0 5px;
}
</style>
