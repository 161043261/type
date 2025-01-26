<script lang="ts" setup>
import SlotChild from './SlotChild.vue'
</script>

<template>
  <div>
    <h1>匿名插槽, 具名插槽, 作用域插槽</h1>
    <!-- 子组件 -->
    <SlotChild>
      <!-- <div>默认插入到子组件的匿名插槽</div> -->

      <!-- <template v-slot>
                     v-slot:default -->
      <!-- <template v-slot="props">
                     v-slot:default="props" -->
      <!-- <template v-slot:slotName="props"
                           #slotName="props" -->
      <!-- <template #default="props"> -->

      <template v-slot:default>
        <div>插入到子组件的匿名插槽 default</div>
      </template>

      <template v-slot:main="{ item, idx }">
        <div>插入到子组件的作用域插槽 main</div>
        <div>{{ `idx: ${idx}, name: ${item.name}, age: ${item.age}` }}</div>
      </template>

      <template #footer>
        <div>插入到子组件的具名插槽 footer, v-slot 等价于 #</div>
      </template>
    </SlotChild>
  </div>
</template>

<style lang="css" scoped></style>
