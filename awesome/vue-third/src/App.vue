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
import { onMounted, ref } from 'vue'
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
import LayoutDemo from './components/LayoutDemo/index.vue'
import ParentDemo from './components/ParentDemo.vue'
import DefineExposeDemo from './components/DefineExposeDemo.vue'
import RecursiveParent from './components/example/RecursiveParent.vue'
import DynamicParent from './components/example/DynamicParent.vue'

// 生命周期钩子
const mountLifeCycleDemo = ref(true)

const refName = ref<InstanceType<typeof DefineExposeDemo>>()
onMounted(() => {
  console.log('[defineExpose]', refName.value?.name, refName.value?.getAge())
})
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
