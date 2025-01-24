<script lang="ts" setup>
import { useCountStore } from '@/stores/count'
import { storeToRefs } from 'pinia'

const countStore = useCountStore() // countStore is a reactive object
// console.log(countStore.sum/* recommend */, countStore.$state.sum);

// Method 2
countStore.$patch({ sum: 1, n: 1 }) // set countStore.sum = 1, set countStore.n = 1
// Method 3
countStore.addSum(2)

function add() {
  // Method 1
  countStore.sum += countStore.n
}

function sub() {
  // Method 1
  countStore.sum -= countStore.n
}

// destruct assignment
// const {sum, n} = countStore; // sum and n are NO LONGER reactive!!!

// 1. use vue.toRefs
// const {sum, n} = toRefs(countStore)

// 2. use pinia.storeToRefs (recommend)
const { sum, n, big, bigger, biggest } = storeToRefs(countStore)

// 3. use vue.toRef
// const sum = toRef(countStore, 'sum');
// const n = toRef(countStore, 'n');
</script>

<template>
  <div class="count">
    <p>sum={{ sum }} big={{ big }} bigger={{ bigger }} biggest={{ biggest }}</p>
    <select v-model.number="n">
      <option v-bind:value="1">1</option>
      <option v-bind:value="2">2</option>
      <option v-bind:value="3">3</option>
    </select>
    <button @click="add">+</button>
    <button @click="sub">-</button>
  </div>
</template>

<style scoped>
.count {
  background-color: lightblue;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px;
}

select,
button {
  margin: 0 5px;
}
</style>
