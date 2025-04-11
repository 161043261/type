<script setup lang="ts"></script>

<template>
  <div style="background: azure">
    <div>name: default (视图 @/views/NameA 的容器)</div>
    <!-- name="default" -->
    <RouterView></RouterView>

    <div>name: nameB (视图 @/views/NameB 的容器)</div>
    <RouterView name="nameB"></RouterView>

    <div>name: nameC (视图 @/views/NameC 的容器)</div>
    <RouterView name="nameC"></RouterView>

    <RouterLink style="margin-left: 10px" to="/container/ab">AB</RouterLink>
    <RouterLink style="margin-left: 10px" to="/container/bc">BC</RouterLink>
  </div>
</template>

<style scoped lang="css"></style>
