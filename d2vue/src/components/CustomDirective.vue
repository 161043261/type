<script setup lang="ts">
import { ref, type Directive, type DirectiveBinding } from 'vue'
import CustomDirectiveChild from './CustomDirectiveChild.vue'

const vMyDirective: Directive = {
  created(...args) {
    console.log('created:', args)
  },
  beforeMount(...args) {
    console.log('beforeMount:', args)
  },
  // 常用
  mounted(el: HTMLElement, binding: DirectiveBinding<{ background: string; textContent: string }>) {
    console.log('mounted:', el, binding)
    el.style.background = binding.value.background
    el.textContent = binding.value.textContent
  },
  beforeUpdate(...args) {
    console.log('beforeUpdated:', args)
  },
  updated(...args) {
    // 常用
    const el = args[0]
    el.textContent = textContent.value
    console.log('updated:', args)
  },
  beforeUnmount(...args) {
    console.log('beforeUnmount', args)
  },
  unmounted(...args) {
    console.log('unmounted', args)
  },
}

const isAlive = ref(true)
const textContent = ref('苏式绿豆汤')
function updateChild() {
  textContent.value += ' yue!'
}
</script>

<template>
  <main>
    <button @click="isAlive = !isAlive">挂载/卸载</button>
    <button @click="updateChild">更新</button>
    <CustomDirectiveChild
      v-if="isAlive"
      v-my-directive:propName.myModifier="{ background: 'lightpink', textContent: textContent }"
    ></CustomDirectiveChild>
  </main>
</template>

<style scoped lang="css"></style>
