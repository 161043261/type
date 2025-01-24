<script lang="ts" setup>
import { ref } from 'vue'

let toy = ref('SnowWhite')
let age = ref(3)

// defineExpose({toy, age});
defineExpose({ toy: toy, age: age })

function subAge(parent: any) {
  console.log('$parent:', parent)
  parent.age--
}
</script>

<template>
  <div class="girl">
    <p>@/views/communicate/$refs-$parent/Girl.vue</p>
    <p>toy: {{ toy }}</p>
    <p>age: {{ age }}</p>
    <!-- $parent -->
    <button @click="subAge($parent)">parent.age--</button>
  </div>
</template>

<style scoped>
.girl {
  margin-top: 20px;
  background-color: lightpink;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px black;
}
</style>
