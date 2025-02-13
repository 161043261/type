<script lang="ts" setup>
import useDog from '@/hooks/useDog'
import useSum from '@/hooks/useSum'
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  console.log('@/views/Hook.vue is mounted')
})
onUnmounted(() => {
  console.log('@/views/Hook.vue is unmounted')
})

const { sum, addSum, bigSum } = useSum()
const { dogList, addDog } = useDog()
</script>

<template>
  <div class="hook">
    <p>Hook</p>
    <p>sum = {{ sum }}; 10 * sum = {{ bigSum }};</p>
    <button @click="addSum">add sum</button>
    <hr />
    <img v-for="(dog, index) in dogList" v-bind:key="index" alt="dog" v-bind:src="dog" /><br />
    <button @click="addDog">add dog</button>
  </div>
</template>

<style lang="css" scoped>
.hook {
  background-color: lightblue;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}

img {
  height: 200px;
  margin-right: 10px;
}
</style>
