<script lang="ts" setup>
import { ref } from 'vue'

let computer = ref('Lenovo')
let age = ref(5)

defineExpose({ computer, age })

function addAge(parent: any) {
  console.log('$parent:', parent)
  parent.age++
}
</script>

<template>
  <div class="boy">
    <p>@/views/communicate/$refs-$parent/Boy.vue</p>
    <p>computer: {{ computer }}</p>
    <p>age: {{ age }}</p>
    <!-- $parent -->
    <button @click="addAge($parent)">parent.age++</button>
  </div>
</template>

<style scoped>
.boy {
  margin-top: 20px;
  background-color: lightcyan;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px black;
}
</style>
