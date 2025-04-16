<script setup lang="ts">
import { ref } from 'vue'

const progress = ref(1)
const bar = ref<HTMLElement>()
let requestId = 0

function loadStart() {
  const barDom = bar.value!
  progress.value = 1
  // https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame
  // 要求浏览器在下一次重绘前, 调用传递的回调函数
  requestId = window.requestAnimationFrame(function fn() {
    if (progress.value < 90) {
      progress.value++
      barDom.style.width = progress.value + '%'
      requestId = window.requestAnimationFrame(fn)
    } else {
      progress.value = 1
      window.cancelAnimationFrame(requestId)
    }
  })
}

function loadEnd() {
  const barDom = bar.value!
  setTimeout(() => {
    requestId = window.requestAnimationFrame(() => {
      progress.value = 100
      barDom.style.width = progress.value + '%'
    })
  }, 1000)
}

// onMounted(() => {
//   loadStart()
//   loadEnd()
// })

defineExpose({
  loadStart,
  loadEnd,
})
</script>

<template>
  <div class="wrapper">
    <div ref="bar" class="bar"></div>
  </div>
</template>

<style scoped lang="css">
.wrapper {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 3px;

  .bar {
    height: inherit;
    width: 0;
    background: lightpink;
  }
}
</style>
