<script lang="ts" setup></script>

<template>
  <div class="yuki-box">
    yuki-box
    <div class="yuki-box__inner">
      yuki-box__inner
      <div class="yuki-box__inner--primary">yuki-box__inner-primary</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// @import "../bem.scss"; // @import 已弃用
@use '../bem.scss' as *; // 导入

// 可以在 vite.config.ts 的 css 预处理中全局导入
@include b(box) {
  // $block: box
  color: #ff0000; // @content
  // $elem: inner
  @include e(inner) {
    color: #00ff00; // @content
    // $mod: primary
    @include m(primary) {
      color: #0000ff; // @content
    }
  }
}
</style>
