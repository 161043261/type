<script lang="ts" setup>
import { reactive } from 'vue'

const items = reactive([
  { name: 'foo', age: 1 },
  { name: 'bar', age: 2 },
])
</script>

<template>
  <div>
    <header>
      <!-- 匿名插槽 -->
      <slot>匿名插槽</slot>
    </header>
    <main>
      <div v-for="(item, idx) of items" :key="idx">
        <!-- 作用域插槽 -->
        <slot name="main" :item="item" :idx="idx">作用域插槽</slot>
      </div>
    </main>
    <footer>
      <!-- 具名插槽 -->
      <slot name="footer">具名插槽</slot>
    </footer>
  </div>
</template>

<style lang="css" scoped>
header,
main,
footer {
  min-height: 50px;
  width: 250px;
  border: 1px solid #ccc;
}
</style>
