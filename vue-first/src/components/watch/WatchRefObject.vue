<script lang="ts" setup>
import { ref, watch } from 'vue'

let person = ref({
  name: 'steve jobs', // tim cook
  age: 0
})

function changeName() {
  person.value.name += '!'
}

function changeAge() {
  person.value.age += 1
}

function changePerson() {
  person.value = {
    name: person.value.name.startsWith('s') ? 'tim cook' : 'steve jobs',
    age: 0
  }
}

// watch(source, callback, options);
watch(
  person,
  (newValue, oldValue) => {
    console.log(oldValue === newValue) // are oldValue and newValue the same object?
  },
  {
    deep: true, // default true
    immediate: false // default false
  }
)
</script>

<template>
  <div class="watchRefObject">
    <p>watch ref(object)</p>
    <p>name = {{ person.name }}</p>
    <p>age = {{ person.age }}</p>
    <button @click="changeName">change name</button>
    <button @click="changeAge">change age</button>
    <button @click="changePerson">change person</button>
  </div>
</template>

<style scoped>
.watchRefObject {
  background-color: lightgreen;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}

button {
  margin: 0 5px;
}
</style>
