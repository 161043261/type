<script lang="ts" setup>
import { inject } from 'vue'

let { money, subMoney } = inject('moneyContext', {
  money: 0,
  subMoney: (arg: number) => {}
})
let car: any = inject('carContext')
</script>

<template>
  <div class="child">
    <p>@/views/communicate/provide-inject/Child.vue</p>
    <p>money from grandparent: {{ money }}</p>
    <p>car from grandparent: brand={{ car.brand }} price={{ car.price }}</p>
    <button @click="subMoney(100)">money-=100</button>
  </div>
</template>

<style scoped>
.child {
  background-color: lightcyan;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px black;
}
</style>
