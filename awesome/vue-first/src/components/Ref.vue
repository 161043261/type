<script lang="ts" setup>
import { ref } from 'vue'

// let car = {brand: "Toyota", price: 10};
let car = ref<{ brand: string; price: number }>({ brand: 'Honda', price: 10 })

// PrimaryType -> ref() -> RefImpl {}
// Object -> reactive() -> Proxy(...) {}

function changeBrand() {
  const brands = ['Honda', 'Mazda', 'Toyota']
  car.value.brand = brands[Math.floor(Math.random() * 3)]
}

function changePrice() {
  car.value.price = Math.floor(Math.random() * 10 + 1)
}

function resetCar() {
  car.value = { brand: 'Honda', price: 10 } // true, car is still reactive.
}

function changeFirstGame() {
  games.value[0].name =
    games.value[0].name == 'Honkai Impact' ? 'Zenless Zone Zero' : 'Honkai Impact'
}

let games = ref<{ id: number; name: string }[]>([
  { id: 1, name: 'Honkai Impact' },
  { id: 2, name: 'Genshin Impact' },
  { id: 3, name: 'Honkai: Star Rail' }
])

let sum = ref(0)

function changeSum() {
  sum.value++
}
</script>

<template>
  <div class="ref">
    <p>ref bases on reactive</p>
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
    <hr />
    <p>sum = {{ sum }}</p>
    <button @click="++sum">++sum</button>
    <button @click="changeSum">sum++</button>
  </div>
</template>

<style scoped>
.ref {
  background-color: lightblue;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}

button {
  margin: 0 5px;
}
</style>
