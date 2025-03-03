<script lang="ts" setup>
import { ref } from 'vue'

interface Item {
  key: number
  label: string
  disabled: boolean
}

const makeList = () => {
  const list: Item[] = []
  for (let i = 1; i <= 16; i++) {
    list.push({
      key: i,
      label: `Item ${i}`,
      disabled: i % 4 === 0,
    })
  }
  return list
}

const list = ref<Item[]>(makeList())
const peerList = ref([])
</script>

<template>
  <div>KeepAliveGirl</div>
  <el-transfer :data="list" v-model="peerList" />
</template>

<style lang="css" scoped></style>
