<script lang="ts" setup>
defineProps(['a', 'b', 'c', 'd', 'x', 'y', 'addA'])
</script>

<template>
  <div class="child">
    <p>@/views/communicate/$attr/Child.vue</p>
    <p>a={{ a }} b={{ b }} c={{ c }} d={{ d }} x={{ x }} y={{ y }}</p>
    <button v-on:click="addA(1)">add grandparent's a</button>
  </div>
</template>

<style scoped>
.child {
  margin-top: 20px;
  background-color: lightcyan;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px black;
}
</style>
