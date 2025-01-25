<script lang="ts" setup>
import { reactive, ref } from 'vue'
import DynamicA from './DynamicA.vue'
import DynamicB from './DynamicB.vue'
import DynamicC from './DynamicC.vue'

const items = reactive([
  {
    name: 'TabA',
    onClick: () => (dynamicItem.value = DynamicA),
  },
  {
    name: 'TabB',
    onClick: () => (dynamicItem.value = DynamicB),
  },
  {
    name: 'TabC',
    onClick: () => (dynamicItem.value = DynamicC),
  },
])

const dynamicItem = ref(DynamicA)
</script>

<template>
  <div style="display: flex">
    <div class="tab" v-for="(item, idx) of items" :key="idx">
      <div @click="item.onClick">{{ item.name }}</div>
    </div>
  </div>
  <component :is="dynamicItem"></component>
</template>

<style lang="css" scoped>
.tab {
  padding: 10px;
  margin: 10px;
  border: 1px solid #ccc;
  cursor: pointer;
}
</style>
