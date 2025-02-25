<script lang="ts" setup>
import { onMounted, ref } from 'vue'

let onMountedToy = ref('OptimusPrime')
let clickToy = ref('Bumblebee')

// declare 'pass-toy' custom event
const emitter = defineEmits(['pass-toy']) // emitter is a function for triggering custom event

onMounted(() => {
  setTimeout(() => {
    emitter('pass-toy', onMountedToy.value /* args */) // trigger 'pass-toy' custom event
  }, 1000)
})
</script>

<template>
  <div class="child">
    <p>@/views/communicate/custom-event/Child.vue</p>
    <p>onMountedToy: {{ onMountedToy }}</p>
    <p>clickToy: {{ clickToy }}</p>
    <!-- click to trigger 'pass-toy' custom event -->
    <button @click="emitter('pass-toy', clickToy)">pass toy to parent</button>
  </div>
</template>

<style scoped>
.child {
  margin-top: 10px;
  background-color: lightcyan;
  padding: 10px;
  box-shadow: 0 0 10px black;
  border-radius: 10px;
}
</style>
