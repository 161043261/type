<script lang="ts" setup>
import emitter from '@/utils/emitter'

let toy: string = 'OptimusPrime'
</script>

<template>
  <div class="girl">
    <p>@/views/communicate/mitt/Girl.vue</p>
    <p>toy: {{ toy }}</p>
    <button @click="emitter.emit('pass-toy', toy)">pass toy to boy</button>
  </div>
</template>

<style scoped>
.girl {
  margin-top: 50px;
  background-color: lightpink;
  padding: 10px;
  box-shadow: 0 0 10px black;
  border-radius: 10px;
}

.boy button {
  margin-right: 5px;
}
</style>
