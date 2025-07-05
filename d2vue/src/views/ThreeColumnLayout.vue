<script setup lang="ts">
import { useCssVar } from '@vueuse/core'

function changeFontSize(pxVal: number) {
  const fontSize = useCssVar('--font-size')
  fontSize.value = `${pxVal}px`
  // 实现原理
  // document.documentElement.style.setProperty('--font-size', `${pixel}px`)
}
</script>

<template>
  <header class="header">
    <div>left</div>
    <div>
      center
      <button @click="changeFontSize(36)">大号字体</button>
      <button @click="changeFontSize(24)">中号字体</button>
      <button @click="changeFontSize(12)">小号字体</button>
    </div>
    <div>right</div>
  </header>
</template>

<style scoped lang="scss">
/**
全局字体大小: 定义根元素的 CSS 变量, 任何页面都可以使用
也可参考 vitepress 的 `.vitepress/theme/style.css` 全局样式
 */
:root /** 即 html */ {
  --font-size: 24px;
}

.header {
  display: flex;

  div {
    height: 50px;
    line-height: 50px;
    color: #fff;
    text-align: center;
    font-size: var(--font-size);
  }

  div:nth-child(1) {
    width: 100px; /** 建议使用 vw */
    background-color: lightpink;
  }
  div:nth-child(2) {
    /** flex: 1
    可以拉伸, 可以压缩, 初始长度为 0 (伸缩项目的宽或高失效)
    */
    flex: 1; // 自适应
    background-color: lightblue;
  }
  div:nth-child(3) {
    width: 100px; /** 建议使用 vw */
    background-color: lightgreen;
  }
}
</style>
