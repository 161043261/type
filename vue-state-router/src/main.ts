import { createApp, createVNode, render } from 'vue'
import { createPinia, type PiniaPlugin, type PiniaPluginContext } from 'pinia'
import App from './App.vue'
import { deepToRaw } from './utils'
import router from './router'

// 导入 element-plus 的 css 文件
import 'element-plus/dist/index.css'
// 全局导入 animate.css
import 'animate.css'

import ProgressBar from './views/ProgressBar.vue'
const whitelist = ['/', '/login']

const barVNode = createVNode(ProgressBar) // 创建虚拟 DOM
console.log('barVNode:', barVNode)
// <body>
//   <barVNode />
// </body>
render(barVNode, document.body) // 渲染真实 DOM

// 路由前置守卫, 前置守卫函数在 redirect 重定向后, 路由跳转前执行
router.beforeEach(
  (to /** (@/router/index.ts 重定向后的) 目的路由 */, from /** 源路由 */, next) => {
    barVNode.component?.exposed?.loadStart()
    console.log('[router.beforeEach] from:', from)
    console.log('[router.beforeEach] to:', to)

    // 路由元信息
    if (to.meta.title) {
      document.title = to.meta /** : RouteMeta */.title
    }

    if (whitelist.includes(to.path) || sessionStorage.getItem('token')) {
      next() // 放行
    } else {
      next('/login') // 重定向到登录
    }
  } /** guard 前置守卫函数 */,
)

// 路由后置守卫, 后置守卫函数在路由跳转后执行
router.afterEach(
  (to, from) => {
    console.log('[router.afterEach] from:', from)
    console.log('[router.afterEach] to:', to)
    barVNode.component?.exposed?.loadEnd()
  } /** guard 后置守卫函数 */,
)

function setLocalStorage(key: string, value: unknown) {
  const rawValue = deepToRaw(value)
  // 对于选项式语法创建的 store 仓库实例, 调用 toRaw(store.$state) 将 $state 转换为普通对象
  // 对于组合式语法创建的 store 仓库实例, 必须递归调用 toRaw(store.$state) 将 $state 转换为普通对象
  localStorage.setItem(key, JSON.stringify(rawValue))
}

function getLocalStorage(key: string) {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : {}
}

let callNum = 0
function makePiniaPersistencePlugin(options?: { keyPrefix?: string }): PiniaPlugin {
  const { keyPrefix = 'pinia' } = options ?? {} // 解构赋值时指定默认值
  return (piniaCtx: PiniaPluginContext) => {
    // 有几个 store 仓库实例, 调用几次 pinia 插件函数
    console.log('callNum:', ++callNum)
    const key = `${keyPrefix}-${piniaCtx.store.$id}`
    const props = getLocalStorage(key)
    console.log(`getLocalStorage, key: ${key}, value: ${JSON.stringify(props)}`)
    // 侦听 state 响应式数据的改变, state 改变时调用传入的 callback, 类似 watch
    piniaCtx.store.$subscribe(() => {
      setLocalStorage(key, deepToRaw(piniaCtx.store.$state))
    })
    return props
  }
}

const app = createApp(App)
const pinia = createPinia()
pinia.use(makePiniaPersistencePlugin())

app.use(pinia)
app.use(router)
app.mount('#app')
