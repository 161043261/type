import { customRef } from 'vue'

export default function (msg: string, timeout: number) {
  // customRef() expects a factory function,
  // which receives track and trigger functions as arguments
  // and should return an object with get and set methods.
  let timer: number
  const customRefMsg = customRef((track, trigger) => {
    return {
      get() {
        // track() should be called inside get()
        track() // To vue: "track customMsg please!"
        return msg
      },
      set(newMsg: string) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          console.log('setter')
          msg = newMsg
          // trigger() should be called inside set()
          trigger() // To vue: "trigger: customMsg has been updated!"
        }, timeout)
      }
    }
  })
  return { customRefMsg }
}
