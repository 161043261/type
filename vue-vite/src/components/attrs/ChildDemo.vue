<script lang="ts" setup>
defineProps(['a', 'b', 'addA', 'p1', 'p2'])
</script>

<template>
  <div>
    <p>a={{ a }} b={{ b }} p1={{ p1 }} p2={{ p2 }}</p>
    <button @click="addA(1)">Add grandparent's a</button>
  </div>
</template>

<style lang="css" scoped></style>
