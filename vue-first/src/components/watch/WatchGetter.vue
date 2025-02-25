<script lang="ts" setup>
import { reactive, watch } from 'vue'

let person = reactive({
  name: 'Kirara', // primaryValue
  age: 3, // primaryValue
  autos: {
    // object
    auto1: 'Mazda',
    auto2: 'Tesla'
  }
})

function changeName() {
  person.name += '!'
}

function changeAge() {
  person.age += 1
}

function changeAuto1() {
  const jpAutos = ['Mazda', 'Toyota', 'Honda', 'Nissan']
  person.autos.auto1 = jpAutos[Math.floor(Math.random() * 4)]
}

function changeAuto2() {
  const usAutos = ['Ford', 'Jeep', 'Cadillac', 'Tesla']
  person.autos.auto2 = usAutos[Math.floor(Math.random() * 4)]
}

function changeAutos() {
  const jpAutos = ['Mazda', 'Toyota', 'Honda', 'Nissan']
  const usAutos = ['Ford', 'Jeep', 'Cadillac', 'Tesla']
  person.autos = {
    auto1: jpAutos[Math.floor(Math.random() * 4)],
    auto2: usAutos[Math.floor(Math.random() * 4)]
  }
}

/**
 * A watch source can only be a getter/effect function, a ref, a reactive, or an array of these types.
 */
watch(
  () => person.name /* getter */,
  (newValue, oldValue) => {
    console.log(newValue === oldValue)
  }
)

watch(person.autos, (newValue, oldValue) => {
  console.log(newValue == oldValue) // monitor object property
})

watch(
  () => person.autos,
  (newValue, oldValue) => {
    // monitor object address
    console.log(newValue == oldValue)
  },
  { deep: true }
) // default false, watch object property meanwhile

watch([() => person.name, person.autos], (newValue, oldValue) => {
  console.log(oldValue, '=>', newValue)
})
</script>

<template>
  <div class="watchAttribute">
    <p>watch property</p>
    <p>name: {{ person.name }}</p>
    <p>age: {{ person.age }}</p>
    <p>autos: {{ person.autos.auto1 }}, {{ person.autos.auto2 }}</p>
    <button @click="changeName">change name</button>
    <button @click="changeAge">change age</button>
    <button @click="changeAuto1">change auto1</button>
    <button @click="changeAuto2">change auto2</button>
    <button @click="changeAutos">change autos</button>
  </div>
</template>

<style scoped>
.watchAttribute {
  background-color: lightpink;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}

button {
  margin: 0 5px;
}
</style>
