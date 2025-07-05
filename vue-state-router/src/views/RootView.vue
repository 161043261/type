<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="root">
    <h1>Root 父路由组件</h1>
    <RouterView></RouterView>
    <!-- 必须加上 /root 父路由前缀 -->
    <RouterLink style="margin-left: 10px" to="/root">RootLogin</RouterLink>
    <RouterLink style="margin-left: 10px" to="/root/register">RootRegister</RouterLink>
  </div>
</template>

<style scoped lang="css">
.root {
  background: azure;
  height: 80vh;
}
</style>
