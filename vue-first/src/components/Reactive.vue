<script lang="ts" setup>
import { reactive } from 'vue'

// let car = {brand: "Toyota", price: 10};
let car = reactive<{ brand: string; price: number }>({ brand: 'Toyota', price: 10 })

// primaryValue => ref(primaryValue) => RefImpl { value: primaryValue }
// object       => ref(object)       => RefImpl { value: Proxy(Object) object }
// object       => reactive(object)  => Proxy(Object) object

function changeBrand() {
  const brands = ['Honda', 'Mazda', 'Toyota']
  car.brand = brands[Math.floor(Math.random() * 3)]
}

function changePrice() {
  car.price = Math.floor(Math.random() * 10 + 1)
}

function resetCar() {
  // car = { brand: "Honda", price: 10 }; // false, car is NO LONGER reactive.
  Object.assign(car, { brand: 'Honda', price: 10 }) // true, car is still reactive.
}

function changeFirstGame() {
  games[0].name = games[0].name == 'Honkai Impact' ? 'Zenless Zone Zero' : 'Honkai Impact'
}

let games = reactive<{ id: number; name: string }[]>([
  { id: 1, name: 'Honkai Impact' },
  { id: 2, name: 'Genshin Impact' },
  { id: 3, name: 'Honkai: Star Rail' }
])
</script>

<template>
  <div class="reactive">
    <p>ref and reactive</p>
    <p>brand={{ car.brand }} price={{ car.price }}w</p>
    <button @click="changeBrand">change brand</button>
    <button @click="changePrice">change price</button>
    <button @click="resetCar">reset car</button>
    <hr />
    <!-- horizontal row -->
    <p>Game List</p>
    <ul>
      <!-- unordered list -->
      <!-- go
           for key, game := range games { ... } -->
      <li v-for="game in games" v-bind:key="game.id">{{ game.name }}</li>
      <!-- list item -->
    </ul>
    <button @click="changeFirstGame">change 1st game</button>
  </div>
</template>

<style scoped>
.reactive {
  background-color: lightgreen;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}

button {
  margin: 0 5px;
}
</style>
