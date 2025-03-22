<script lang="ts" setup>
import { onMounted, reactive, watch } from 'vue'

const props = defineProps<{
  list: {
    h: number
    bg: string
  }[]
}>()
// console.log(props) // ShallowReactive

const styles = reactive<
  {
    h: number
    bg: string
    top: number
    left: number
  }[]
>([])

const refresh = () => {
  // 每个 item 宽 120px, 右边距 10px
  const boxW = 120 /** w */ + 10 /** padding-right */
  const colCnt = Math.floor(document.body.clientWidth / boxW) // 列数
  const hList: number[] = []
  for (let i = 0; i < props.list.length; i++) {
    const item = {
      h: props.list[i].h,
      bg: props.list[i].bg,
      top: 0,
      left: 0,
    }
    if (i < colCnt) {
      item.top = 10 // 每个 item 上边距 10px
      item.left = i * boxW
      hList.push(10 /** padding-top */ + item.h)
      styles.push(item)
    } else {
      let minH = hList[0]
      let minHIdx = 0
      hList.forEach((h, idx) => {
        if (h < minH) {
          minH = h
          minHIdx = idx
        }
      })
      console.log(`minH: ${minH}, minHIdx: ${minHIdx}`)
      item.top = minH + 10
      item.left = minHIdx * boxW
      hList[minHIdx] += 10 /** padding-top */ + item.h
      styles.push(item)
    }
  }
  console.log('[Waterfall] styles:', styles)
}

onMounted(() => {
  refresh()
  // window.onresize = (...args) => {
  //   console.log(args)
  //   refresh()
  // }
  window.onresize = refresh
})

watch(props.list, () => {
  refresh()
})
</script>

<template>
  <div class="wrapper">
    <div
      v-for="(item, idx) of styles"
      :key="idx"
      :style="{
        height: item.h + 'px',
        background: item.bg,
        top: item.top + 'px',
        left: item.left + 'px',
      }"
      class="item"
    >
      Waterfall Child
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  position: relative; // 父元素相对定位
  height: 100%;

  .item {
    position: absolute; // 子元素绝对定位
    width: 120px;
  }
}
</style>
