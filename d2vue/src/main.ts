import '@/assets/main.scss'

import { createApp } from 'vue'
import router from '@/router'

import App from './App.vue'
import { useResize, vuePlugin } from '@/utils'
const app = createApp(App)

import { myUse } from './utils/my_use'
import 'uno.css'

// 全局变量
app.config.globalProperties.$env = 'dev'
app.config.globalProperties.$api = {
  stringify<T>(arg: T) {
    return JSON.stringify(arg)
  },
}

app.use(router)
app.use(useResize)
// app.use(vuePlugin)
myUse.bind(app)(vuePlugin)
myUse.bind(app)(vuePlugin)

app.mount('#app')

type Api = {
  stringify<T>(arg: T): string
}

// 类型扩展
declare module 'vue' {
  export interface ComponentCustomProperties {
    $env: string
    $api: Api
  }
}
