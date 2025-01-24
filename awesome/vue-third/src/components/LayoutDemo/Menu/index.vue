<script lang="ts">
export default {
  name: 'LayoutMenu',
}
</script>

<script lang="ts" setup></script>

<template>
  <div class="yuki-menu">Menu</div>
</template>

<style lang="scss" scoped>
@use '../../../bem.scss' as *;

@include b(menu) {
  min-width: 250px;
  height: 100%;
  border-right: 1px solid #ccc;
}
</style>
