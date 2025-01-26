<script lang="ts" setup>
import { type CatList } from '@/types'

// // using Array syntax
// const props = defineProps(['args', 'cats']); // data passed from the parent component '../App.vue'

// type-based declaration (recommend)
withDefaults(
  defineProps<{
    args?: string[] // optional
    cats: CatList // necessary
  }>(),
  { args: () => ['defineProps', 'data', 'passed', 'from', 'parent'] }
) // defaults (value is primaryType or getter)
</script>

<template>
  <div class="prop">
    <p>{{ args }}</p>
    <ul>
      <!-- let names = ['bh3', 'ys', 'hsr'];  -->
      <!-- for (let index in names) console.log(index); // 0 1 2 -->
      <!-- for (let name of names) console.log(name); // bh3 ys hsr -->

      <!-- key: the unique identifier for each item -->
      <li v-for="cat in cats" v-bind:key="cat.id">{{ cat.name }} {{ cat.age }}</li>
    </ul>
  </div>
</template>

<style scoped>
.prop {
  background-color: lightpink;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}
</style>
