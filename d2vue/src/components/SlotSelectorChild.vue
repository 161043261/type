<script setup lang="ts"></script>

<template>
  <main>
    <div>匿名插槽</div>
    <slot></slot>
  </main>
</template>

<style scoped lang="css">
:slotted(.default-slot-template) {
  width: 100px;
  height: 100px;
  background: azure;
}
</style>
