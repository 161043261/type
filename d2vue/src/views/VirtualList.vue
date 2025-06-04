<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'

const containerRef = ref()

// 大列表
const largeList = ref(new Array(1000).fill({}).map((_item, idx) => ({ id: idx })))
// 子项高度
const itemHeight = ref(60)
// 可视区信息
const visibleInfo = reactive({
  startIdx: 0, // 起始索引
  endIdx: 0, // 结束索引
  height: 0, // 可视区高度
})
// 可视区数据
const visibleData = computed(() => {
  return largeList.value.slice(
    visibleInfo.startIdx,
    Math.min(visibleInfo.endIdx, largeList.value.length),
  )
})
// 可视区子项数量
const visibleCnt = computed(() => {
  return Math.ceil(visibleInfo.height / itemHeight.value)
})
// 可视区起始偏移量
const startOffset = ref(0)
// 虚拟列表高度
const phantomHeight = ref(0)
// phantomHeight.value = largeList.value.length * itemHeight.value;
const transform = computed(() => `translateY(${startOffset.value}px)`)
console.log(transform.value)

// 初始化
onMounted(() => {
  console.log('containerRef.value.clientHeight:', containerRef.value.clientHeight)
  visibleInfo.height = containerRef.value.clientHeight
  phantomHeight.value = largeList.value.length * itemHeight.value
  visibleInfo.startIdx = 0
  visibleInfo.endIdx = visibleInfo.startIdx + visibleCnt.value
})

const handleScroll = (ev: Event) => {
  console.log('handleScroll:', ev)
  const scrollTop = (ev.target as HTMLDivElement).scrollTop
  visibleInfo.startIdx = Math.floor(scrollTop / itemHeight.value)
  visibleInfo.endIdx = visibleInfo.startIdx + visibleCnt.value
  startOffset.value = visibleInfo.startIdx * itemHeight.value
}
</script>

<template>
  <main>
    <!-- 可视区 container -->
    <div ref="containerRef" class="container" @scroll="handleScroll">
      <!-- 虚拟区 phantom -->
      <div
        class="phantom"
        :style="{
          height: phantomHeight + 'px',
        }"
      ></div>
      <!-- 内容区 content -->
      <div class="content" :style="{ transform: transform }">
        <div
          v-for="item of visibleData"
          ref="itemRef"
          :key="item.id"
          class="item"
          :style="{
            height: itemHeight + 'px', // height: 60px;
            lineHeight: itemHeight + 'px', // line-height: 60px;
          }"
        >
          {{ item.id }}
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="css">
.container {
  width: 200px;
  height: 300px;
  position: relative;
  overflow: auto;
  background-color: azure;

  .content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    background-color: lightblue;

    .item {
      box-sizing: border-box;
      border: 1px solid #ccc;
      text-align: center;
      color: #333;
    }
  }
}
</style>
