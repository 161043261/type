<script lang="ts">
export default {
  name: 'RecursiveChild', // 也可以自定义 name
}
</script>

<script lang="ts" setup>
interface TreeNode {
  name: string,
  checked: boolean,
  children?: TreeNode[]
}

defineProps<{
  data?: TreeNode[] // template 中直接使用 data
}>()
</script>

<template>
  <div>
    <div class="tree" v-for="(item, idx) of data" :key="idx">
      <div>
        <input type="checkbox" v-model="item.checked" /> <span>{{ item.name }}</span>
      </div>
      <!-- 递归组件, 使用文件名 -->
      <RecursiveChild v-if="item.children?.length" :data="item.children"></RecursiveChild>
    </div>

  </div>
</template>

<style lang="css" scoped>
.tree {
  margin-left: 30px;
}
</style>
