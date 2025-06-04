<script setup lang="ts">
import { ref } from 'vue'

const bg = ref('lightpink')
const style = ref({
  color: 'white',
})
setInterval(() => {
  bg.value = bg.value === 'lightpink' ? 'lightblue' : 'lightpink'
}, 1000)
</script>

<template>
  <main>
    <div class="dynamic-css">动态 CSS</div>
  </main>
</template>

<style scoped lang="css">
.dynamic-css {
  width: 300px;
  text-align: center;
  background: v-bind(bg);
  color: v-bind('style.color');
}
</style>
