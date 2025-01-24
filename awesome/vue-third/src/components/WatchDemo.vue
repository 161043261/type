<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'

const primaryType = ref('foobar') // 原始值为基本类型
// ref 创建的响应式变量, 原始值为引用类型
const refType = ref({ foo: { bar: 'foobar' } })
// reactive 创建的响应式变量, 原始值为引用类型
const refType2 = reactive({ foo: { bar: 'foobar' } })

// 侦听一个响应式变量, 默认浅层侦听 (侦听原始值的地址)
watch(primaryType, (newVal: string, oldVal: string) => {
  console.log('[primaryType] shallow:', newVal, oldVal) // callback
})

// 侦听 ref 创建的响应式变量, 默认浅层侦听 (侦听原始值的地址)
watch(refType, (newVal, oldVal) => {
  console.log('[refType] shallow:', newVal, oldVal) // callback
})

// 侦听多个响应式变量
watch([primaryType, refType], (newVal, oldVal) => {
  console.log('[primaryType, refType] shallow:', newVal, oldVal) // callback
})

// 侦听 ref 创建的响应式变量, 默认浅层监听 (deep: false 或 deep: 0)
watch(
  refType,
  (newVal, oldVal) => {
    console.log('[refType] deep=1:', newVal, oldVal) // callback
    console.log(newVal === oldVal, newVal === refType.value)
  }, // callback
  {
    // deep: true // 开启深层侦听, 性能很差
    deep: 1,
    // deep 也可以是一个数字, 表示最大侦听深度
    // deep: 1,表示最大侦听深度为 1 (即 .value.foo 这一层)
    // 默认 deep: 0, 表示侦听原始值的地址 (即 .value 这一层)
    immediate: true, // 默认 immediate: false, 即懒执行 callback
    // immediate: true, 即立即执行 callback, 此时 oldVal === undefined
  },
)

// 侦听 reactive 创建的响应式变量, 默认开启深度监听 (deep: true), 性能很差
watch(refType2, (newVal, oldVal) => {
  console.log('[refType2] reactive:', newVal, oldVal) // callback
  console.log(newVal === oldVal, newVal === refType2)
})

// 可以通过传递一个 getter, 侦听 reactive 创建的响应式变量中指定的属性
// 不会侦听到 refType2.foo.bar (changeRefType3) 的改变
watch(
  () => refType2.foo,
  (newVal, oldVal) => {
    console.log('[refType2] specified field:', newVal, oldVal) // callback
    console.log(newVal === oldVal)
  },
)

function changePrimaryTypeAddr() {
  primaryType.value += '@'
}

function changeRefType() {
  // 深度为 1
  refType.value.foo = { bar: refType.value.foo.bar + '1' }
}

function changeRefType2() {
  // 深度为 2
  refType.value.foo.bar += '2'
}

function changeRefTypeAddr() {
  // 深度为 0, 改变原始值的地址
  refType.value = {
    foo: {
      bar: refType.value.foo.bar + '0',
    },
  }
}

function changeRefType3() {
  refType2.foo.bar += '!'
}

function changeRefType4() {
  refType2.foo = {
    bar: refType2.foo.bar + '#',
  }
}
</script>

<template>
  <div>
    <h1>侦听器 watch, watchEffect</h1>
    <div>
      {{ `${JSON.stringify(primaryType)} ${JSON.stringify(refType)} ${JSON.stringify(refType2)}` }}
    </div>

    <button @click="changePrimaryTypeAddr">changePrimaryTypeAddr</button>
    <!-- newVal === oldVal,
           newVal === refType.value -->
    <button @click="changeRefType">changeRefType (deep=1)</button>
    <!-- 侦听不到 -->
    <button @click="changeRefType2">changeRefType2 (deep=2)</button>
    <!-- newVal !== oldVal,
           newVal === refType.value -->
    <button @click="changeRefTypeAddr">changeRefTypeAddr (deep=0)</button>
    <!-- newVal === oldVal,
           newVal === refType2 -->
    <button @click="changeRefType3">changeRefType3</button>
    <!-- newVal !== oldVal -->
    <button @click="changeRefType4">changeRefType4</button>
  </div>
</template>

<style lang="css" scoped></style>
