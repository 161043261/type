<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- 父组件中, 为 Boy 组件的自定义事件绑定回调函数,
自定义事件发生时, 接收 Boy 组件发射的参数 -->
<script lang="ts" setup>
import { ref } from 'vue'
import BoyDemo from './BoyDemo.vue'
import GirlDemo from './GirlDemo.vue'

const flag = ref<boolean>(false)
const timeStr = ref<string>('方式 1: 通过父组件桥接, 实现兄弟组件通信')

function rxArgs(flag_: boolean, timeStr_: string) {
  flag.value = flag_
  timeStr.value = timeStr_
}
</script>

<template>
  <div>
    <BoyDemo @custom-event="(flag: boolean, timeStr: string) => rxArgs(flag, timeStr)" />
    <!-- 将 Boy 组件发射的参数, 绑定到 Girl 组件的自定义属性 -->
    <GirlDemo :flag="flag" :timeStr="timeStr" />
  </div>
</template>

<style lang="css" scoped></style>
