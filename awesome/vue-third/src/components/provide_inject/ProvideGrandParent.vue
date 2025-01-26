<script lang="ts" setup>
import { ref } from 'vue';

const colorVal = ref(0);
</script>

<template>
  <div>
    <h1>provide/inject</h1>
    <input type="radio" value="red" name="color" v-model="colorVal">
  </div>
</template>

<style lang="css" scoped></style>
