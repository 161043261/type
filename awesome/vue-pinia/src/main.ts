import { createApp } from 'vue'
import { createPinia, type PiniaPluginContext } from 'pinia'
import App from './App.vue'

const piniaPersistencePlugin = (ctx: PiniaPluginContext) => {
  console.log(ctx)
}

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPersistencePlugin)

app.use(pinia)
app.mount('#app')
