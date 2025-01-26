<script lang="ts">
// export default {
//   data() {
//     return {
//       cnt: 0,
//     }
//   },
//   methods: {
//     addCnt() {
//       this.cnt++;
//     }
//   }
// }

// import { ref } from 'vue'

// export default {
//   setup() {
//     const cnt = ref(1)
//     const addCnt = () => {
//       cnt.value++
//     }
//     return {
//       cnt,
//       addCnt,
//     }
//   },
// }
</script>

<script lang="ts" setup>
import { defineAsyncComponent, onMounted, ref } from 'vue'
import DirectiveDemo from './components/DirectiveDemo.vue'
import RefDemo from './components/RefDemo.vue'
import CustomRefDemo from './components/CustomRefDemo.vue'
import ReactiveDemo from './components/ReactiveDemo.vue'
import ToXxxDemo from './components/ToXxxDemo.vue'
import ComputedDemo from './components/ComputedDemo.vue'
import ComputedDemo2 from './components/ComputedDemo2.vue'
import WatchDemo from './components/WatchDemo.vue'
import WatchEffectDemo from './components/WatchEffectDemo.vue'
import LifeCycleDemo from './components/LifeCycleDemo.vue'
import BEMDemo from './components/BEMDemo.vue'
import LayoutDemo from './components/layout/LayoutDemo.vue'
import ParentDemo from './components/ParentDemo.vue'
import DefineExposeDemo from './components/DefineExposeDemo.vue'
import RecursiveParent from './components/example/RecursiveParent.vue'
import DynamicParent from './components/example/DynamicParent.vue'
import SlotParent from './components/slot/SlotParent.vue'
import DynamicSlotParent from './components/slot/DynamicSlotParent.vue'
import SuspenseSkeleton from './components/SuspenseSkeleton.vue'
import TeleportDemo from './components/TeleportDemo.vue'

// 生命周期钩子
const mountLifeCycleDemo = ref(true)

const refName = ref<InstanceType<typeof DefineExposeDemo>>()
onMounted(() => {
  console.log('[defineExpose]', refName.value?.name, refName.value?.getAge())
})

// 使用 defineAsyncComponent 定义的异步组件
const SuspenseAsync = defineAsyncComponent(() => import('./components/SuspenseAsync.vue'))
</script>

<template>
  <RouterView></RouterView>

  <hr />
  <DirectiveDemo />
  <RefDemo />
  <CustomRefDemo />
  <ReactiveDemo />
  <ToXxxDemo />
  <ComputedDemo />
  <ComputedDemo2 />
  <WatchDemo />
  <WatchEffectDemo />
  <LifeCycleDemo v-if="mountLifeCycleDemo" />
  <button @click="mountLifeCycleDemo = !mountLifeCycleDemo">挂载/卸载 LifeCycleDemo 组件</button>
  <BEMDemo />
  <LayoutDemo />
  <ParentDemo />
  <DefineExposeDemo ref="refName" />
  <!-- 全局组件 CardComponent -->
  <CardComponent />
  <RecursiveParent />
  <DynamicParent />
  <SlotParent />
  <DynamicSlotParent />

  <!-- Suspense 等待有异步 setup 钩子的组件, 或使用 defineAsyncComponent 定义的异步组件 -->
  <!-- Suspense 组件有两个插槽: #default 和 #fallback, 两个插槽都只允许一个直接子节点,
   尽可能显示 #default 插槽中的节点, 否则显示 #fallback 插槽中的节点 -->
  <Suspense>
    <template #default>
      <SuspenseAsync />
    </template>
    <template v-slot:fallback>
      <SuspenseSkeleton />
    </template>
  </Suspense>
  <TeleportDemo />
</template>

<style lang="scss">
@use './bem.scss' as *;

* {
  margin: 0;
  padding: 0;
}

#app {
  @include bfc;
}
</style>
