<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import emitter from '@/utils/emitter'

let computer = ref('Lenovo')
let toy = ref('')

onMounted(() => {
  emitter.on('pass-toy', (value: any) => {
    // bind 'pass-toy' event
    toy.value = value
  })
})

onUnmounted(() => {
  // unbind 'pass-toy' event
  emitter.off('pass-toy')
})
</script>

<template>
  <div class="boy">
    <p>@/views/communicate/mitt/Boy.vue</p>
    <p>computer: {{ computer }}</p>
    <p>toy passed from girl: {{ toy }}</p>
  </div>
</template>

<style scoped>
.boy {
  margin-top: 50px;
  background-color: lightcyan;
  padding: 10px;
  box-shadow: 0 0 10px black;
  border-radius: 10px;
}
</style>
