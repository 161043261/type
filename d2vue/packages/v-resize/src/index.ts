// InterSectionObserver 监听目标元素与祖先元素或视口相交情况的变化
// MutationObserver 监听整个 DOM 树的变化
// ResizeObserver 监听元素宽高的变化
import { type App } from 'vue'
function useResize(el: HTMLElement, callback: (contentRect: DOMRectReadOnly) => void) {
  const resizeObserver = new ResizeObserver((entries) => {
    console.log(entries[0])
    callback(entries[0].contentRect)
  })
  resizeObserver.observe(el)
}

// Vue 插件: 一个有 install 属性的函数
// install 属性值: 接收一个 App 实例的函数
const install = (app: App) => {
  app.directive('resize', {
    mounted(el, binding) {
      useResize(el, binding.value)
    },
  })
}

useResize.install = install
export default useResize;
