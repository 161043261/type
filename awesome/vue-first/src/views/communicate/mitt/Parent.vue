<script lang="ts" setup>
import Girl from './Girl.vue'
import Boy from './Boy.vue'
</script>

<template>
  <div class="parent">
    <p>@/views/communicate/mitt/Parent.vue</p>
    <p>Girl -- toy(OptimusPrime) -> Boy</p>
    <Girl />
    <Boy />
  </div>
</template>

<style scoped>
.parent {
  background-color: lightblue;
  padding: 20px;
  border-radius: 10px;
}

.parent button {
  margin-left: 5px;
}
</style>
