<script lang="ts" setup>
import { reactive, ref, watch, watchEffect } from 'vue'

const str = ref('foobar')
const obj = ref({ foo: 'bar' })
const obj2 = reactive({ foo: 'bar' })

// watch 可以返回停止侦听的函数
const unwatch = watch(
  [str, obj], // sources
  (newVal, oldVal, onCleanup /** 可选参数 */) => {
    console.log('[watch]', newVal, oldVal)
    onCleanup(() => {
      console.log('[watch] Before...')
    }) // onCleanup 先执行
  }, // callback
  { immediate: true }, // options
)

// watchEffect 可以返回停止侦听的函数
const unwatch2 = watchEffect(
  (onCleanup /** 可选参数 */) => {
    const div: HTMLDivElement =
      document.querySelector('#WatchEffectDemo_div')! /** as HTMLDivElement */
    // 默认 flush: 'pre' 组件挂载/更新前触发 callback
    // 首次执行 callback: watchEffectDemo_div: null
    // 指定 flush: 'post' 组件挂载/更新后触发 callback
    // 首次执行 callback 可以获取到 div 元素
    console.log('WatchEffectDemo_div:', div)
    // 自动侦听 msg.value, msg2.value 的地址, 不需要指定 sources
    console.log('[watchEffect]', str.value, obj.value)
    onCleanup(() => {
      console.log('[watchEffect] Before...')
    }) // onCleanup 先执行
  }, // callback
  {
    flush: 'post',
    // 默认 flush: 'pre' 组件挂载/更新前触发 callback
    // flush: 'sync' 同步触发 callback
    // flush: 'post' 组件挂载/更新后触发 callback

    // 调试选项 onTrigger, onTrack
    onTrigger(ev) {
      console.log(ev)
      debugger
    },
  },
) // callback 立即执行, 不需要指定 { immediate: true }
// watch(source, cb, { immediate: true })

watchEffect(() => {
  // 可以指定侦听的深层属性 obj.value.foo, 实现深层侦听
  console.log('[watchEffect2]', obj.value.foo)
})

watchEffect(() => {
  console.log('[watchEffect3]', obj2)
})

watchEffect(() => {
  console.log('[watchEffect4]', obj2.foo)
})

function changeStr() {
  str.value += '@'
}

function changeObj() {
  obj.value.foo += '!'
}

function changeObj2() {
  obj.value = {
    foo: obj.value.foo + '@',
  }
}

function changeObj3() {
  obj2.foo += '!'
}
</script>

<template>
  <div>
    <div id="WatchEffectDemo_div">
      {{ `${str} ${JSON.stringify(obj)} ${JSON.stringify(obj2)}` }}
    </div>
    <button @click="changeStr">changeStr</button>
    <!-- watchEffect 侦听不到, watchEffect2 侦听的到 -->
    <button @click="changeObj">changeObj</button>
    <button @click="unwatch">停止 watch 侦听</button>
    <button @click="changeObj2">changObj2</button>
    <button @click="unwatch2">停止 watchEffect 侦听</button>
    <!-- watchEffect3 侦听不到, watchEffect4 侦听的到 -->
    <button @click="changeObj3">changObj3</button>
  </div>
</template>

<style lang="css" scoped></style>
