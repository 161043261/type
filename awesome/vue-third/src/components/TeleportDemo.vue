<script lang="ts" setup>
import { ref } from 'vue'

const showPopup = ref(false)
const showPopup2 = ref(false)
</script>
<template>
  <h1>Teleport</h1>
  <button @click="showPopup = true">显示弹窗 (Teleport + absolute 绝对定位, 上划以查看)</button>
  <button @click="showPopup2 = true">显示弹窗2 (fixed 固定定位)</button>

  <!-- popup 是 body 的直接子元素 -->
  <Teleport to="body" :disabled="false">
    <!-- to="选择器" -->
    <!-- disable 是否禁用传送 -->
    <div class="popup" v-show="showPopup">
      <button @click="showPopup = false">隐藏弹窗</button>
    </div>
    <div>我也是 body 的直接子元素</div>
  </Teleport>

  <!-- popup2 是 #app 的直接子元素 -->
  <div class="popup2" v-show="showPopup2">
    <button @click="showPopup2 = false">隐藏弹窗2</button>
  </div>
</template>

<style lang="scss" scoped>
$border-color: #ccc;

.popup,
.popup2 {
  left: 50%;
  top: 50%;
  box-sizing: border-box;
  // 等价于 margin-left: -100px; margin-top: -100px;
  transform: translate(-50%, -50%); // 平移
  width: 200px;
  height: 200px;
  border: 1px solid $border-color;

  button {
    width: 100px;
    position: relative; // relative 相对定位, 参考原位置
    left: 50px; // (200px / 2) - (100px / 2)
    // 等价于 transform: translateX(50px)
    margin-top: 150px;
  }
}

// 如果没有 relative 相对定位的父元素, 则 absolute 绝对定位参考 body 元素定位
// 如果有 relative 相对定位的父元素, 则 absolute 绝对定位参考该父元素
// fixed 固定定位, 参考视口; relative 相对定位, 参考原位置
// 解决 1: absolute 绝对定位, 并使用 Teleport 将部分 template 传送到 body 元素下
// 解决 2: fixed 固定定位 (实际上更好)
.popup {
  // 解决 1
  position: absolute;
  background: lightblue;
}

.popup2 {
  // 解决 2
  position: fixed;
  background: lightpink;
}
</style>
