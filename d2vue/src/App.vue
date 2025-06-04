<script lang="ts" setup>
import KeepAliveParent from '@/components/KeepAliveParent.vue'
import TransitionDemo from '@/components/TransitionDemo.vue'
import TransitionWithGSAP from '@/components/TransitionWithGSAP.vue'
import TransitionGroupDemo from '@/components/TransitionGroupDemo.vue'
import TransitionGroupDemo2 from '@/components/TransitionGroupDemo2.vue'
import TransitionGroupDemo3 from '@/components/TransitionGroupDemo3.vue'
import JsxDemo from '@/JsxDemo'
import JsxDemo2 from '@/JsxDemo2'
import ModelParent from '@/components/ModelParent.vue'
import CustomDirective from '@/components/CustomDirective.vue'
import CustomDirective2 from '@/components/CustomDirective2.vue'
import CustomHook from '@/components/CustomHook.vue'
import { getCurrentInstance } from 'vue'
import VuePluginTest from './components/VuePluginTest'
import DeepCSS from './components/DeepCSS.vue'
import SlotSelector from './components/SlotSelector.vue'
import DynamicCSS from './components/DynamicCSS.vue'
import CSSModule from './components/CSSModule.vue'
import UnoCSS from './components/UnoCSS.vue'

// 自定义元素
import D2vueBtn from '@/components/d2vue-btn.ce.vue'
import { defineCustomElement } from 'vue'
const Btn = defineCustomElement(D2vueBtn)
window.customElements.define('d2vue-btn', Btn)
const item = { name: 'whoami', age: 22 }

const app = getCurrentInstance()
console.log('$env:', app?.proxy?.$env)
console.log('$api.stringify:', app?.proxy?.$api.stringify({ a: 1, b: 2 }))

console.log('import.meta.env:', import.meta.env)
// {
//   BASE_URL: '/',
//   DEV: true,
//   MODE: 'development',
//   PROD: false,
//   SSR: false
// }

// fetch('http://localhost:8080/user')
// fetch('/api/user')
//   .then((res) => res.json())
//   .then((data) => console.log(data))
</script>

<template>
  <div>
    <d2vue-btn :item="item"></d2vue-btn>
    <div style="font-size: var(--font-size)">$env: {{ $env }}</div>
    <div style="font-size: var(--font-size)">
      $api.stringify: {{ $api.stringify({ a: 1, b: 2 }) }}
    </div>
    <div style="display: flex; justify-content: space-between">
      <RouterLink :to="{ name: 'CustomDirective3' }">CustomDirective3</RouterLink>
      <RouterLink :to="{ name: 'CustomDirective4' }">CustomDirective4</RouterLink>
      <RouterLink :to="{ name: 'ResizeDemo' }">ResizeDemo</RouterLink>
      <RouterLink :to="{ name: 'NextTick' }">NextTick</RouterLink>
      <RouterLink :to="{ name: 'NextTick2' }">NextTick2</RouterLink>
      <RouterLink :to="{ name: 'ThreeColumn' }">ThreeColumn</RouterLink>
      <RouterLink :to="{ name: 'FunctionalDemo' }">FunctionalDemo</RouterLink>
      <RouterLink :to="{ name: 'VirtualList' }">VirtualList</RouterLink>
    </div>
    <RouterView></RouterView>
    <hr />
    <DeepCSS />
    <VuePluginTest />
    <JsxDemo />
    <JsxDemo2 prop-name="propVal" @event-type="(...args) => console.log(args)" />
    <h1>KeepAlive</h1>
    <KeepAliveParent />
    <h1>Transition</h1>
    <TransitionDemo />
    <TransitionWithGSAP />
    <TransitionGroupDemo />
    <TransitionGroupDemo2 />
    <TransitionGroupDemo3 />
    <ModelParent />
    <CustomDirective />
    <CustomDirective2 />
    <CustomHook />
    <SlotSelector />
    <DynamicCSS />
    <CSSModule />
    <UnoCSS />
  </div>
</template>

<style lang="scss">
@mixin bfc {
  height: 100%;
  // overflow 属性值不等于 visible 的元素, 都开启了 bfc
  overflow: hidden;
}

* {
  margin: 0;
  padding: 0;
}

#app {
  @include bfc;
}

button {
  background: none;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
}
</style>
