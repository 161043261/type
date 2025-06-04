<script generic="T extends object" setup lang="ts">
import { toRef } from 'vue'

const props = defineProps<{
  list: T[]
}>()

const list = toRef(props, 'list')

defineSlots<{
  default(props: { item: T; idx: number }): void
}>()
</script>

<template>
  <main>
    <ul>
      <li v-for="(item, idx) of list" :key="idx">
        <!-- 匿名插槽 -->
        <slot :item="item" :idx="idx"></slot>
      </li>
    </ul>
  </main>
</template>

<style scoped lang="css"></style>
