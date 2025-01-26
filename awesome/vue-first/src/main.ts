import { createApp, reactive, ref } from 'vue'
import App from './App.vue' // import component
import router from './router/index'
//
// 1. import pinia
//
import { createPinia } from 'pinia'
//
// import mitt
//

const app = createApp(App)
// use router
app.use(router)

//
// 2. create pinia
//
const pinia = createPinia()
//
// 3. use pinia
//
app.use(pinia)

//TODO unpack
function unpack() {
  const obj = reactive({
    a: 1,
    b: 2,
    c: ref(3) // c can automatic unpacking
  })
  const x = ref(3) // x can NOT automatic unpacking
  console.log(obj.a, obj.b, obj.c, x.value)
}

// mount the app to the DOM ../index.html:12
app.mount('#app') // <div id="app"></div>
