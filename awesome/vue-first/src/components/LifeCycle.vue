<script lang="ts" setup>
import {
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  onUpdated,
  ref
} from 'vue'

let sum = ref(0)

function add() {
  sum.value++
}

// LifeCycle: beforeCreate & created => setup
onBeforeMount(() => console.log('onBeforeMount'))
onMounted(() => console.log('child mounted'))
onBeforeUpdate(() => console.log('onBeforeUpdate'))
onUpdated(() => console.log('onUpdated'))
onBeforeUnmount(() => {
  console.log('onBeforeUnmount')
})
onUnmounted(() => {
  console.log('onUnmounted')
})
</script>

<template>
  <div class="lifeCycle">
    <p>LifeCycle: sum = {{ sum }}</p>
    <button @click="add">add</button>
  </div>
</template>

<style scoped>
.lifeCycle {
  background-color: lightgreen;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}
</style>
