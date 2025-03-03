<script setup lang="ts">
import "@/assets/index.scss";
import { ref } from "vue";

const name = ref<string>("whoami");
</script>

<template>
  <main>
    <h1>{{ name }}</h1>
  </main>
</template>

<style scoped lang="css"></style>
