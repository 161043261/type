<script lang="ts" setup>
import { markRaw, reactive, ref, toRaw } from 'vue'

// ***** toRaw *****
let people = reactive({
  name: 'Tom',
  age: 1
})

let rawPeople = toRaw(people)

function changePeopleAge() {
  people.age++
}

function changePeopleName() {
  people.name += '!'
}

function changeRawPeopleName() {
  rawPeople.name += '!!!!!!!!!!'
}

function changeRawPeopleAge() {
  rawPeople.age += 10
}

// ***** markRaw *****
let car = markRaw({ brand: 'Mazda', price: 1 })
let reactiveCar = reactive(car)
console.log(reactiveCar) // {brand: 'Mazda', price: 1, __v_skip: true}
let refCar = ref(car)
console.log(refCar)

function changeRefCarPrice() {
  refCar.value.price++ // invalid
}
</script>

<template>
  <div class="toRawMarkRaw">
    <p><em>***** toRaw, toMarkRaw *****</em></p>
    <p>name: {{ people.name }}</p>
    <p>age: {{ people.age }}</p>
    <button @click="changePeopleAge()">people.age += 1</button>
    <button @click="changePeopleName()">people.name += '!'</button>
    <button @click="changeRawPeopleAge()">rawPeople.age += 10</button>
    <button @click="changeRawPeopleName()">rawPeople.name += '!!!!!!!!!!'</button>
    <hr />
    <p>refCar: {{ refCar }}</p>
    <button @click="changeRefCarPrice()">refCarPrice += 1 (invalid)</button>
    <!-- invalid -->
  </div>
</template>

<style scoped>
button {
  margin-right: 5px;
}

.toRawMarkRaw {
  background-color: lightpink;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}
</style>
