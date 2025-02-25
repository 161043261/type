<script lang="ts" setup></script>

<template>
  <div class="yuki-content">
    <div class="yuki-content__items" v-for="(item, idx) of 3" :key="idx">
      {{ item }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../../bem.scss' as *;

@include b(content) {
  flex: 1;
  overflow: auto;

  @include e(items) {
    padding: 10px;
    margin: 10px;
    border: 1px solid #ccc {
      radius: 10px;
    }
  }
}
</style>
