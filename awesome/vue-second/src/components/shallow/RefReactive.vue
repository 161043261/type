<script lang="ts" setup>
import { shallowReactive, shallowRef } from 'vue'

let sum = shallowRef(0)

let people = shallowRef(
  {
    name: 'Tom', // -> non-reactive
    age: 1 // -> non-reactive
  } /* -> reactive */
)

let car = shallowReactive({
  brand: 'Mazda', // -> reactive
  options: {
    color: 'black', // -> non-reactive
    engine: 'V8' // -> non-reactive
  }
})

function changeSum() {
  // succeed
  sum.value += 1
}

function changeAge() {
  // fail
  people.value.age += 1
}

function changeName() {
  // fail
  people.value.name += '!'
}

function changePeople() {
  // succeed
  people.value = people.value.name == 'Tom' ? { name: 'Jerry', age: 0 } : { name: 'Tom', age: 1 }
}

function changeBrand() {
  // succeed
  car.brand = car.brand == 'Mazda' ? 'Toyota' : 'Mazda'
}

function changeColor() {
  // fail
  car.options.color = car.options.color == 'black' ? 'white' : 'black'
}

function changeEngine() {
  // fail
  car.options.engine = car.options.engine == 'V8' ? 'JVM' : 'V8'
}

// function changeCar() { car = Object.assign(car, {}) }
</script>

<template>
  <div class="refReactive">
    <p><em>***** shallowRef, shallowReactive *****</em></p>
    <p>sum: {{ sum }}</p>
    <p>name: {{ people.name }}</p>
    <p>age: {{ people.age }}</p>
    <p>car: {{ car }}</p>
    <button @click="changeSum">sum++</button>
    <button @click="changeName">change name (invalid)</button>
    <button @click="changeAge">change age (invalid)</button>
    <button @click="changePeople">change people</button>
    <br />
    <button @click="changeBrand">change brand</button>
    <button @click="changeColor">change color (invalid)</button>
    <button @click="changeEngine">change engine (invalid)</button>
  </div>
</template>

<style scoped>
button {
  margin-right: 5px;
  margin-bottom: 5px;
}

.refReactive {
  background-color: lightgreen;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}
</style>
