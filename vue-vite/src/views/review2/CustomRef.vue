<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import { customRef, ref } from 'vue'

function myRefFactory<T>(val: T, timeout: number) {
  let timer: any
  const myRef: ReturnType<typeof customRef> = customRef(
    (track: () => void /** 收集依赖 */, trigger: () => void /** 触发更新 */) => {
      return {
        get: () => {
          track()
          return val
        },
        set: (newVal: T) => {
          clearTimeout(timer)
          timer = setTimeout(() => {
            val = newVal
            trigger()
            timer = null
          }, timeout)
        },
      }
    },
  )
  return myRef
}
const refMsg = ref('')
const myRefMsg = myRefFactory('', 1000)
</script>

<template>
  <div>
    <div>Normal ref: {{ refMsg }}</div>
    <div>Debounced customRef: {{ myRefMsg }}</div>
    <input type="text" v-model="refMsg" placeholder="Normal ref" />
    <input type="text" v-model="myRefMsg" placeholder="Debounced customRef" />
  </div>
</template>

<style lang="css" scoped></style>
