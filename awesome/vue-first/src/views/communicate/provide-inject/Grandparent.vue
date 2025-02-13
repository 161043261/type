<script lang="ts" setup>
import Parent from './Parent.vue'
import { provide, reactive, ref } from 'vue'

let money = ref(100_000_000)
let car = reactive({
  brand: 'MercedesBenz',
  price: 100
})

// providing data and function to child
provide('moneyContext', { money: money, subMoney /* equivalent to `"subMoney": subMoney` */ })
provide('carContext', car)

function subMoney(delta: number) {
  money.value -= delta
}
</script>

<template>
  <div class="grandparent">
    <p>@/views/communicate/provide-inject/Grandparent.vue</p>
    <p>money: {{ money }}</p>
    <p>car: {{ car }}</p>
    <Parent />
  </div>
</template>

<style scoped>
.grandparent {
  background-color: skyblue;
  padding: 20px;
  border-radius: 10px;
}
</style>
