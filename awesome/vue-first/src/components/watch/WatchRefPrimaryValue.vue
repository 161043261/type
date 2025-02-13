<script lang="ts" setup>
import { ref, watch } from 'vue'

let sum = ref(0)

function changeSum() {
  sum.value++
}

const stopWatching = watch(sum, (newValue, oldValue) => {
  console.log(oldValue, '->', newValue)
  if (newValue > 10) {
    stopWatching()
  }
})
</script>

<template>
  <div class="watchRefPrimaryValue">
    <p>watch ref(primaryValue)</p>
    <p>sum = {{ sum }}</p>
    <button @click="changeSum">sum++</button>
  </div>
</template>

<style scoped>
.watchRefPrimaryValue {
  background-color: lightpink;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}
</style>
