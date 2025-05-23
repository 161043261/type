import { defineComponent, useAttrs, onMounted } from 'vue'

export /** async */ function useCustomHook(options: { el: string }): Promise<{ baseUrl: string }> {
  return new Promise((resolve /** , reject */) => {
    onMounted(() => {
      const img = document.querySelector(options.el) as HTMLImageElement
      // console.log(img)
      img.onload = () => {
        resolve({
          baseUrl: toBase64(img),
        })
      }
    })

    const toBase64 = (el: HTMLImageElement) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = el.width
      canvas.height = el.height
      ctx?.drawImage(el, 0, 0, canvas.width, canvas.height)
      return canvas.toDataURL('image/svg')
    }
  })
}

export default defineComponent({
  props: ['c'],
  setup(props: { c: string }) {
    const attrs = useAttrs()
    console.log('attrs:', attrs)
    console.log('props:', props)
    return () => (
      <>
        <main>CustomHookChild</main>
      </>
    )
  },
})
