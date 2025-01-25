<script lang="ts" setup>
import { reactive, ref } from 'vue';
import ChildDemo from './ChildDemo.vue';

// 父传子
const refStr_ = ref('Reactive Str From Parent')
const reactiveArr_ = reactive([6, 6, 6])

// 子传父
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rxFromChild(...args: any[]) {
  console.log(args)
}
</script>

<template>
  <div>
    <h1>父子组件传参 defineProps, defineEmits, defineExpose</h1>
    <!-- str 使用默认值 -->
    <ChildDemo :refStr="refStr_" :reactiveArr="reactiveArr_" />
    <ChildDemo str="Str From Parent" :refStr="refStr_" :reactiveArr="reactiveArr_" />
    <!-- 是响应式的 -->
    <button @click="refStr_ += '!'">changeRefStr</button>
    <button @click="reactiveArr_.push(4)">changeReactiveArr</button>
    <ChildDemo @ev-name="(...args: any[]) => rxFromChild(args)" @ev-name2="rxFromChild"></ChildDemo>
  </div>
</template>

<style lang="css" scoped>

</style>
