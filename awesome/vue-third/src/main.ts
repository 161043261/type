import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import mitt from 'mitt'

// 在 main.ts 中 import 导入的组件, 是全局组件 (全局导入, 直接使用)
import GlobalComponent from './components/example/GlobalComponent.vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

/////////////////// mitt ////////////////////////
declare module 'vue' {
  export interface ComponentCustomProperties {
    $bus: ReturnType<typeof mitt>
  }
}
const emitter = mitt()
app.config.globalProperties.$bus = emitter
/////////////////////////////////////////////////

app.component('CardComponent', GlobalComponent)

app.use(createPinia())
app.use(router)

app.mount('#app')
