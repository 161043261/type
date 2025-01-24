<script lang="ts" setup>
import { useCatStore } from '@/stores/cat'
import { storeToRefs } from 'pinia'
//
// pinia
//
const catStore = useCatStore()
const { catList } = storeToRefs(catStore)
catStore.$subscribe((mutation, state) => {
  console.log(mutation, state)
  localStorage.setItem('catList', JSON.stringify(state.catList))
})

function clear() {
  localStorage.clear()
}
</script>

<template>
  <div class="cat">
    <ul>
      <li v-for="cat in catList" :key="cat.id">{{ cat }}</li>
    </ul>
    <button @click="catStore.addCat">add URL</button>
    <button @click="clear">localStorage.clear()</button>
  </div>
</template>

<style scoped>
.cat {
  background-color: lightpink;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px;
}

button {
  margin: 0 5px;
}
</style>
