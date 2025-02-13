import { defineComponent, getCurrentInstance } from 'vue'

export default defineComponent({
  setup() {
    const app = getCurrentInstance()
    console.log(app?.proxy?.$vuePluginDemo.isAlive.value)
    return () => (
      <>
        <div>isAlive: {`${app?.proxy?.$vuePluginDemo.isAlive.value}`}</div>
        <button onClick={() => app?.proxy?.$vuePluginDemo.changeAlive()}>changeAlive</button>
      </>
    )
  },
})
