<script setup lang="ts">
import SlotSelectorChild from './SlotSelectorChild.vue'
</script>

<template>
  <main>
    <SlotSelectorChild>
      <div class="default-slot-template">父组件插入到子组件的匿名插槽</div>
    </SlotSelectorChild>
  </main>
</template>

<style scoped lang="css"></style>
