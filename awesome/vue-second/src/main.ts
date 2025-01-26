/**
 * ***** global api *****
 * * app.use
 * * app.component
 * * app.config
 * * app.directive
 * * app.mount
 * * app.unmount
 */
import { createApp } from 'vue'
import Demo from './Demo.vue'
import App from './App.vue'
import type axios from 'axios'
import { createPinia } from 'pinia'

const app = createApp(App)

/**
 * app.use
 */
app.use(createPinia())

/**
 * app.component
 */
app.component('Demo', Demo) // global component

/**
 * app.config
 */
app.config.globalProperties.x = 'global property' // global property

declare module 'vue' {
  interface ComponentCustomProperties {
    $http: typeof axios
    $translate: (key: string) => string
    x: string
  }
}

/**
 * app.directive
 */
app.directive('beautify', (element, { value }) => {
  // global instruction
  element.innerText += value
  element.style.color += 'red'
  element.style.backgroundColor = 'lightyellow'
})

/**
 * app.mount
 */
app.mount('#app')

/**
 * app.unmount
 */
setTimeout(() => {
  app.unmount()
}, 60_000)
