<script lang="ts" setup>
import { ref } from 'vue'

let toy = ref('OptimusPrime')
defineProps(['car', 'passToy'])
</script>

<template>
  <div class="child">
    <p>@/views/communicate/props/Child.vue</p>
    <p>toy: {{ toy }}</p>
    <p>car passed from parent: {{ car }}</p>
    <button @click="passToy(toy)">pass toy to parent</button>
  </div>
</template>

<style scoped>
.child {
  background-color: lightcyan;
  padding: 10px;
  box-shadow: 0 0 10px black;
  border-radius: 10px;
}
</style>
