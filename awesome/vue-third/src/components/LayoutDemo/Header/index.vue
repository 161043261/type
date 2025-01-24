<script lang="ts">
export default {
  name: 'LayoutHeader',
}
</script>

<script lang="ts" setup></script>

<template>
  <div class="yuki-header">Header</div>
</template>

<style lang="scss" scoped>
@use '../../../bem.scss' as *;

@include b(header) {
  height: 50px;
  border-bottom: 1px solid #ccc;
}
</style>
