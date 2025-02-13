<script lang="ts" setup>
import { ref, watch, watchEffect } from 'vue'

let temperature = ref(0)
let depth = ref(0)

function changeTemperature() {
  temperature.value += 10
}

function changeDepth() {
  depth.value += 10
}

// watch implementation
watch([temperature, depth], (value) => {
  let [newTemperature, newDepth] = value // destruct assignment
  if (newTemperature >= 60 || newDepth >= 80) {
    console.log('alert: watch implementation')
  }
})

// watchEffect implementation: reactively watch
watchEffect(() => {
  if (temperature.value >= 60 || depth.value >= 80) {
    // reactively watch temperature and depth
    console.log('alert: watchEffect implementation')
  }
}) // immediate
</script>

<template>
  <div class="watchEffect">
    <p>watch effect</p>
    <p>temperature = {{ temperature }}</p>
    <p>depth = {{ depth }}</p>
    <button @click="changeTemperature">temperature+=10</button>
    <button @click="changeDepth">depth+=10</button>
  </div>
</template>

<style scoped>
.watchEffect {
  background-color: lightgreen;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}

button {
  margin: 0 5px;
}
</style>
