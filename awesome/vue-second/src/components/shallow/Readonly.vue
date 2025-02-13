<script lang="ts" setup>
import { reactive, readonly, ref, shallowReadonly } from 'vue'

let sum = ref(0)
let readonlySum = readonly(sum) // readonlySum is readonly, but sum is mutable
function changeSum() {
  sum.value += 1
}

let car = reactive({
  brand: 'Mazda', // -> shallowReadonlyCar: readonly
  options: {
    color: 'black', // -> shallowReadonlyCar: mutable
    price: 1 // -> shallowReadonlyCar: mutable
  }
})
let readonlyCar = readonly(car) // readonlyCar is readonly, but car is mutable
let shallowReadonlyCar = shallowReadonly(car)

function changeBrand() {
  car.brand = car.brand == 'Mazda' ? 'Toyota' : 'Mazda'
}

function changeColor() {
  car.options.color = car.options.color == 'black' ? 'white' : 'black'
}

function changePrice() {
  car.options.price++
  shallowReadonlyCar.options.price++
}
</script>

<template>
  <div class="readonly">
    <p><em>***** shallowReadonly *****</em></p>
    <p>sum = {{ sum }}</p>
    <p>readonlySum = {{ readonlySum }}</p>
    <p>car = {{ car }}</p>
    <p>readonlyCar = {{ readonlyCar }}</p>
    <p>shallowReadonlyCar = {{ shallowReadonlyCar }}</p>
    <button @click="changeSum()">sum++</button>
    <button @click="changeBrand()">change brand</button>
    <button @click="changeColor()">change color</button>
    <button @click="changePrice()">change price</button>
  </div>
</template>

<style scoped>
button {
  margin-right: 5px;
}

.readonly {
  background-color: lightpink;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}
</style>
