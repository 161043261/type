<script lang="ts" setup>
import { reactive, watch } from 'vue'

let person = reactive({
  name: 'steve jobs', // tim cook
  age: 0
})

function changeName() {
  person.name += '!'
}

function changeAge() {
  person.age += 1
}

function changePerson() {
  Object.assign(person, {
    name: person.name.startsWith('s') ? 'tim cook' : 'steve jobs', // new object
    age: 0
  })
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
  <div class="watchReactiveObject">
    <p>watch reactive(object)</p>
    <p>name = {{ person.name }}</p>
    <p>age = {{ person.age }}</p>
    <button @click="changeName">change name</button>
    <button @click="changeAge">change age</button>
    <button @click="changePerson">change person</button>
  </div>
</template>

<style scoped>
.watchReactiveObject {
  background-color: lightblue;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}

button {
  margin: 0 5px;
}
</style>
