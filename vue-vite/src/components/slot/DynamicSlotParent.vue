<script lang="ts" setup>
import { ref } from 'vue'
import SlotChild from './SlotChild.vue'

const slotName = ref('default')
</script>

<template>
  <div>
    <h1>动态插槽</h1>
    <SlotChild>
      <template v-slot:[slotName]="">
        <div>Dynamic Slot</div>
      </template>
    </SlotChild>
    <button @click="slotName = 'default'">default</button>
    <button @click="slotName = 'main'">main</button>
    <button @click="slotName = 'footer'">footer</button>
  </div>
</template>

<style lang="css" scoped></style>
