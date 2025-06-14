<script setup lang="ts">
import type { Directive, DirectiveBinding } from 'vue'

// glob 懒汉式加载, 分开打包
// {
//   ['/src/assets/images/lazy.jpg']: () => import('/src/assets/images/lazy.jpg?import')
// }
// eager: true 饿汉式加载, 合并打包
// import xxx from 'xxx'
// {
//   ['/src/assets/images/lazy.jpg']: Module{}
// }
const imageList: Record<string, { default: string }> = import.meta.glob('@/assets/images/*.jpg', {
  eager: true,
})
const arr = Object.values(imageList).map((item) => item.default)
const vLazy: Directive<HTMLImageElement, string> = async (
  el: HTMLImageElement,
  binding: DirectiveBinding<string>,
) => {
  el.src = (await import('@/assets/logo.svg')).default
  const observer = new IntersectionObserver((entries) => {
    // intersectionRatio 目标元素与根元素的相交矩形的面积与目标元素边界矩形的比值
    console.log(entries[0].intersectionRatio)
    if (entries[0].intersectionRatio > 0) {
      // 在视口中的比例 > 0 时
      setTimeout(() => {
        // 2s 后懒加载图片
        el.src = binding.value
      }, 2000)
      observer.unobserve(el) // 停止监听指定目标元素
    }
  })
  observer.observe(el) // 监听指定目标元素
}
</script>

<template>
  <main class="main">
    <img v-for="item of arr" :key="item" :alt="item" width="500px" v-lazy="item" />
  </main>
</template>

<style scoped lang="css">
.main {
  display: flex;
  flex-direction: column;
}
</style>
