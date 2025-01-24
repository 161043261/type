<script lang="ts" setup>
import { ref } from 'vue'
import axios from 'axios'

let {
  data: { message }
} = await axios.get('https://dog.ceo/api/breeds/image/random')
let msg = ref(message)
</script>

<template>
  <div class="child">
    <p>msg = {{ msg }}</p>
  </div>
</template>

<style scoped>
.child {
  background-color: lightcyan;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}
</style>
