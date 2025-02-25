<script lang="ts" setup>
import Child from './Child.vue'
import { ref } from 'vue'

let toy = ref('')

function passToy(value: string) {
  console.log('toy passed from child: ', value)
  toy.value = value
}

const logger = ($event: Event) => console.log($event)
</script>

<template>
  <div class="parent">
    <p>@/views/communicate/custom-event/Parent.vue</p>
    <p v-show="toy">toy passed from child: {{ toy }}</p>
    <button @click="logger($event)">native dom $event</button>
    <!-- bind 'pass-toy' custom event -->
    <Child @pass-toy="passToy" @click="logger($event)" />
  </div>
</template>

<style scoped>
.parent {
  background-color: lightblue;
  padding: 20px;
  border-radius: 10px;
}

.parent button {
  margin-right: 5px;
}
</style>
