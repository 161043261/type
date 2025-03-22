// InterSectionObserver 监听目标元素与祖先元素或视口相交情况的变化
// MutationObserver 监听整个 DOM 树的变化
// ResizeObserver 监听元素宽高的变化
import VuePluginDemo from '@/components/VuePluginDemo.vue'
import { createVNode, render } from 'vue'
import type { App, Plugin, Ref, VNode } from 'vue'
const useResize = (el: HTMLElement, callback: (contentRect: DOMRectReadOnly) => void) => {
  const resizeObserver = new ResizeObserver((entries) => {
    callback(entries[0].contentRect)
  })
  resizeObserver.observe(el)
}

// Vue 插件: 一个有 install 属性的对象
// install 属性值: 接收一个 App 实例的函数
const install = (app: App) => {
  app.directive('resize', {
    mounted(el, binding) {
      console.log(binding.value)
      useResize(el, binding.value /** callback */)
    },
  })
}

useResize.install = install

// Vue 插件: 一个有 install 属性的对象
// install 属性值: 接收一个 App 实例的函数

// import { createVNode, render } from 'vue'
// import type { App, Plugin, Ref, VNode } from 'vue'
const vuePlugin: Plugin = {
  install(app: App) {
    const vnode: VNode = createVNode(VuePluginDemo)
    render(vnode, document.body /** container */)
    app.config.globalProperties.$vuePluginDemo = {
      isAlive: vnode.component?.exposed?.isAlive,
      changeAlive: vnode.component?.exposed?.changeAlive,
    }
  },
}
// 类型扩展
declare module 'vue' {
  export interface ComponentCustomProperties {
    $vuePluginDemo: {
      isAlive: Ref<boolean>
      changeAlive: () => void
    }
  }
}

export { useResize, vuePlugin }
