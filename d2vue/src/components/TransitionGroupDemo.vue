<script lang="ts" setup>
import { reactive } from 'vue'
import 'animate.css'

const list = reactive<number[]>([1, 2, 3, 4, 5])
</script>

<template>
  <el-button @click="list.push(list.length + 1)">push</el-button>
  <el-button @click="list.pop()">pop</el-button>
  <!-- tag="section" tag 属性为多个 div 包裹一层 section 标签 -->
  <div class="wrapper">
    <TransitionGroup
      tag="section"
      enter-active-class="animate__animated animate__bounceIn"
      leave-active-class="animate__animated animate__bounceOut"
    >
      <div class="item" v-for="(item, idx) of list" :key="idx">{{ item }}</div>
    </TransitionGroup>
  </div>
</template>

<style lang="scss" scoped>
.wrapper > section {
  display: flex;
  // flex-wrap: nowrap; // 单行 flex 容器
  flex-wrap: wrap; // 多行 flex 容器
  border: 1px solid #ccc;
  .item {
    margin: 0 10px;
  }
}
</style>
