<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import { customRef, isRef, onMounted, reactive, ref, shallowRef, triggerRef } from 'vue'

const refObj = ref({ name: 'ref' })
console.log('refObj:', refObj) // refObj: RefImpl {}
console.log('refObj isRef:', isRef(refObj)) // refObj isRef: true

const shallowRefObj = shallowRef({ name: 'reactive' })
console.log('shallowRefObj:', shallowRefObj) // shallowRefObj: RefImpl {}
console.log('shallowRefObj isRef:', isRef(shallowRefObj)) // shallowRefObj isRef: true

const reactiveObj = reactive({ name: 'reactiveObj' })
console.log('reactiveObj:', reactiveObj) // reactiveObj: { name: 'reactiveObj' }
console.log('reactiveObj isRef:', isRef(reactiveObj)) // reactiveObj isRef: false

function shallowChangeCb(ev: Event) {
  console.log(ev)
  // refObj.value.name += '#'
  shallowRefObj.value.name += '#'
}

function deepChangeCb(ev: Event) {
  console.log(ev)
  // refObj.value = Object.assign({}, refObj.value, { name: refObj.value.name + '#' })
  shallowRefObj.value = Object.assign({}, shallowRefObj.value, {
    name: shallowRefObj.value.name + '#',
  })
}

function shallowChangeThenTriggerRefCb(ev: Event) {
  shallowChangeCb(ev)
  //! triggerRef
  triggerRef(shallowRefObj)
}

//! customRef
function myRef<T>(value: T) {
  let timer: any = null
  return customRef((track: () => void /** 收集依赖 */, trigger: () => void /** 触发更新 */) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue: T) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          value = newValue
          trigger()
          timer = null
        }, 1000)
      },
    }
  })
}

const customRefObj = myRef({ name: 'customRef' })
function shallowChangeCb2() {
  customRefObj.value.name += '!'
}
function deepChangeCb2() {
  customRefObj.value = { name: customRefObj.value.name + '!' }
}

const divRef = ref<HTMLDivElement>()
onMounted(() => {
  console.log(divRef.value?.innerText)
})
</script>

<template>
  <h1>ref, shallowRef, isRef, customRef, triggerRef</h1>

  <p>同时使用 ref/reactive 和 shallowRef 时, shallowRef 表现的像深层响应式</p>

  <div>ref: {{ refObj }}</div>
  <div>shallowRef: {{ shallowRefObj }}</div>

  <div style="display: flex; flex: 1">
    <button @click="((refObj.name += '!'), (shallowRefObj.name += '!'))">
      shallowChange! <em>shallowRefObj</em> with <em>refObj</em>
    </button>

    <button
      v-on:click="
        (_ev) => {
          console.log(_ev)
          refObj = { name: refObj.name + '!' }
          shallowRefObj = { name: shallowRefObj.name + '!' }
        }
      "
    >
      deepChange! <em>shallowRefObj</em> with <em>refObj</em>
    </button>

    <button @click="shallowChangeCb">
      shallowChange# <em>shallowRefObj</em> without <em>refObj</em>
    </button>

    <button v-on:click="deepChangeCb">
      deepChange# <em>shallowRefObj</em> without <em>refObj</em>
    </button>

    <button @click="shallowChangeThenTriggerRefCb">
      shallowChange# then triggerRef <em>shallowRefObj</em> without <em>refObj</em>
    </button>
  </div>

  <div>customRef: {{ customRefObj }}</div>
  <button @click="shallowChangeCb2">shallowChange! customRefObj</button>
  <button @click="deepChangeCb2">deepChange! customRefObj</button>

  <div ref="divRef">ref 绑定 DOM 元素</div>
</template>

<style lang="css" scoped></style>
