<script lang="ts" setup>
import { reactive, ref, shallowRef } from 'vue'
import DynamicA from './DynamicA.vue'
import DynamicB from './DynamicB.vue'
import DynamicC from './DynamicC.vue'
const active = ref(0)
// 不要创建组件的 ref 对象, 使用 markRaw 标记组件, 或使用 shallowRef 代替 ref 避免不必要的性能开销
// const dynamicItem = ref(DynamicA)

// const dynamicItem = shallowRef<typeof DynamicA>(DynamicA)

// function onClick(com: typeof DynamicA, idx: number) {
//   active.value = idx;
//   dynamicItem.value = com;
// }

// const items = reactive([
//   { name: 'TabA', onClick: (idx: number) => onClick(DynamicA, idx) },
//   { name: 'TabB', onClick: (idx: number) => onClick(DynamicB, idx) },
//   // markRaw 设置 __skip__ = true, 跳过 proxy 代理, 这里是可选的
//   { name: 'TabC', onClick: (idx: number) => onClick(markRaw(DynamicC), idx) },
// ])

const dynamicItem = shallowRef<string>('DynamicA')

function onClick(com: string, idx: number) {
  active.value = idx
  dynamicItem.value = com
}

const items = reactive([
  { name: 'TabA', onClick: (idx: number) => onClick('DynamicA', idx) },
  { name: 'TabB', onClick: (idx: number) => onClick('DynamicB', idx) },
  { name: 'TabC', onClick: (idx: number) => onClick('DynamicC', idx) },
])

defineOptions({
  components: {
    DynamicA: DynamicA,
    DynamicB,
    DynamicC,
  },
})
</script>

<!-- <script lang="ts">
import DynamicA from './DynamicA.vue'
import DynamicB from './DynamicB.vue'
import DynamicC from './DynamicC.vue'

export default {
  // 注册子组件
  components: {
    DynamicA: DynamicA,
    DynamicB,
    DynamicC
  }
}
</script> -->

<template>
  <h1>动态组件</h1>
  <div style="display: flex">
    <div
      class="tab"
      :class="[active === idx ? 'active' : '']"
      v-for="(item, idx) of items"
      :key="idx"
    >
      <div @click="item.onClick(idx)">{{ item.name }}</div>
    </div>
  </div>
  <component :is="dynamicItem"></component>
</template>

<style lang="css" scoped>
.tab {
  padding: 10px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  cursor: pointer;
}

.active {
  background: #ccc;
}
</style>
