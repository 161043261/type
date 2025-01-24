import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import elem from 'element-plus'
import { createPersistedState } from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
const persistedState = createPersistedState()

pinia.use(persistedState)

app.use(pinia)
app.use(router)
app.use(elem)

app.mount('#app')
