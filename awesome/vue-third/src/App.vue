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
import { onMounted, reactive, ref } from 'vue'
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
import ChildDemo from './components/ChildDemo.vue'
import DefineExposeDemo from './components/DefineExposeDemo.vue'
import RecursiveParent from './components/example/RecursiveParent.vue'

// 生命周期钩子
const mountLifeCycleDemo = ref(true)
// 父传子
const refStr_ = ref('Reactive Str From Parent')
const reactiveArr_ = reactive([6, 6, 6])

// 子传父
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rxFromChild(...args: any[]) {
  console.log(args)
}
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
  <h1>父子组件传参 defineProps, defineEmits, defineExpose</h1>
  <!-- str 使用默认值 -->
  <ChildDemo :refStr="refStr_" :reactiveArr="reactiveArr_" />
  <ChildDemo str="Str From Parent" :refStr="refStr_" :reactiveArr="reactiveArr_" />
  <!-- 是响应式的 -->
  <button @click="refStr_ += '!'">changeRefStr</button>
  <button @click="reactiveArr_.push(6)">changeReactiveArr</button>
  <ChildDemo @ev-name="(...args) => rxFromChild(args)" @ev-name2="rxFromChild"></ChildDemo>

  <DefineExposeDemo ref="refName" />

  <!-- 全局组件 CardComponent -->
  <CardComponent />
  <RecursiveParent />
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
