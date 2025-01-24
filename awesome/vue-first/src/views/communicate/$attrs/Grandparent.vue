<script lang="ts" setup>
import { ref } from 'vue'
import Parent from './Parent.vue'

let av = ref(1)
let bv = ref(2)
let cv = ref(3)
let dv = ref(4)

function addA(da: number) {
  av.value += da
}
</script>

<template>
  <div class="grandparent">
    <p>@/views/communicate/$attr/Grandparent.vue</p>
    <p>a={{ av }} b={{ bv }} c={{ cv }} d={{ dv }}</p>
    <!-- v-bind="{ x: 5, y: 6 }" 等价于 :x=5 :y=6 -->
    <Parent :a="av" :addA="addA" :b="bv" :c="cv" :d="dv" :="{ x: 5, y: 6 }" />
  </div>
</template>

<style scoped>
.grandparent {
  background-color: skyblue;
  padding: 20px;
  border-radius: 10px;
}
</style>
