<!-- eslint-disable prefer-spread -->
<script lang="ts" setup>
import { ref } from 'vue'
import { shuffle } from 'lodash'

// [undefined, undefined, undefined]
// new Array(3).fill(undefined)
// 等价于 Array.from({ length: 3 })
// 等价于 Array.apply(null, { length: 3 })
const list = ref(
  Array.apply(null, {
    length: 81,
  } as number[]).map((val, idx) => ({
    id: idx,
    val: (idx % 9) + 1,
  })),
)

function shuffleList() {
  list.value = shuffle(list.value)
}
</script>

<template>
  <div>
    <el-button @click="shuffleList">shuffleList</el-button>
    <!-- move-class: 平移的过渡效果 -->
    <TransitionGroup move-class="mv" class="wrapper" tag="div">
      <!-- v-for 绑定 key 时不能使用 idx, 否则无法实现过渡效果 -->
      <!-- 错误实践: 使用索引 _index_ (拼接其他值) 作为 key -->
      <!-- 正确实践: 使用唯一值 _id_ 作为 key -->
      <div class="item" v-for="item of list" :key="item.id">
        {{ item.val }}
      </div>
    </TransitionGroup>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap; // 多行 flex 容器
  width: calc(27px * 9);
  .item {
    width: 25px;
    height: 25px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center; /** 水平居中 */
    align-items: center; /** 垂直居中 */
  }
}

.mv {
  transition: all 1s;
}
</style>
