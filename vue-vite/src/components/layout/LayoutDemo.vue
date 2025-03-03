<script lang="ts" setup>
import LayoutContent from './LayoutContent.vue'
import LayoutHeader from './LayoutHeader.vue'
import LayoutMenu from './LayoutMenu.vue'
</script>

<template>
  <div class="yuki-box">
    <div>
      <LayoutMenu></LayoutMenu>
    </div>
    <div class="yuki-box__right">
      <LayoutHeader></LayoutHeader>
      <LayoutContent></LayoutContent>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../../bem.scss' as *;

@include b(box) {
  @include bfc;
  display: flex;

  @include e(right) {
    display: flex;
    // 主轴方向从上到下, 侧轴方向从左到右
    flex-direction: column;
    // flex: 1 1 0; 的简写
    // flex-grow: 1; 主轴上有剩余时的拉伸比例
    // flex-shrink: 1; 主轴上有溢出时的压缩比例
    // flex-basis: 0; 主轴的初始长度
    flex: 1;
  }
}
</style>
