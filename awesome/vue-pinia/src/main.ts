/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApp, isRef, unref } from 'vue'
import { createPinia, type PiniaPlugin, type PiniaPluginContext } from 'pinia'
import App from './App.vue'

function deepToRaw(observed: any) {
  const isObject = (val: any) => val !== null && typeof val === 'object'
  // unref(obj)
  // 如果 obj 是 ref 创建的响应式对象, 则返回 obj.value; 否则直接返回 obj
  const val = isRef(observed) ? unref(observed) : observed
  if (!isObject(val)) {
    return val
  }
  if (Array.isArray(val)) {
    const rawArr: any[] = []
    val.forEach((item) => {
      rawArr.push(deepToRaw(item))
    })
    return rawArr
  }
  const rawObj: any = {}
  Object.keys(val).forEach((key) => {
    rawObj[key] = deepToRaw(val[key])
  })
  return rawObj
}

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
app.mount('#app')
