<script setup lang="ts">
import { useCssModule } from 'vue'

const styleMod = useCssModule() // 默认模块 $style
const customMod = useCssModule('customModule') // 自定义模块 customMod
console.log(styleMod)
console.log(customMod)

// 场景
// () => (<div class={$style.box}>这是 JSX</div>)
</script>

<template>
  <main style="display: flex">
    <!-- 默认模块 $style -->
    <div :class="$style.box">CSS Module</div>
    <!-- class 可以绑定数组 -->
    <div :class="[$style.box, $style.border]">CSS Module2</div>
    <!-- 可以自定义模块名 -->
    <div :class="[$style.box, customModule.bg]">CSS Module3</div>
  </main>
</template>

<style module lang="css">
.box {
  width: 100px;
  height: 100px;
  background: lightblue;
}

.border {
  border: 1px solid #000;
}
</style>

<!-- 可以自定义模块名 -->
<style module="customModule">
.bg {
  background: lightpink;
}
</style>
