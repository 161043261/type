<script lang="ts" setup>
import RecursiveChild from './RecursiveChild.vue'
import { reactive } from 'vue'

interface TreeNode {
  name: string
  checked: boolean
  children?: TreeNode[]
}

const data = reactive<TreeNode[]>([
  { name: '1', checked: false },
  { name: '2', checked: false, children: [{ name: '2.1', checked: false }] },
  {
    name: '3',
    checked: false,
    children: [
      {
        name: '3.1',
        checked: false,
        children: [{ name: '3.1.1', checked: false }],
      },
    ],
  },
])
</script>

<template>
  <div>
    <RecursiveChild :data="data"></RecursiveChild>
  </div>
</template>

<style lang="css" scoped></style>
