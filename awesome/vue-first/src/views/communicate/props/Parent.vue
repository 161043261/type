<script lang="ts" setup>
import Child from './Child.vue'
import { ref } from 'vue'

let car = ref('MercedesBenz')
let toy = ref('')

function passToy(value: string) {
  toy.value = value
}
</script>

<template>
  <div class="parent">
    <p>@/views/communicate/props/Parent.vue</p>
    <p>car: {{ car }}</p>
    <p v-show="toy">toy passed from child: {{ toy }}</p>
    <!-- communicate by props -->
    <Child v-bind:car="car" v-bind:passToy="passToy" />
  </div>
</template>

<style scoped>
.parent {
  background-color: lightblue;
  padding: 20px;
  border-radius: 10px;
}
</style>
