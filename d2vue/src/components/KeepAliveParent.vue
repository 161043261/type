<script lang="ts" setup>
import { ref } from 'vue'
import KeepAliveBoy from './KeepAliveBoy.vue'
import KeepAliveGirl from './KeepAliveGirl.vue'

const flag = ref(true)
</script>

<template>
  <div>
    <el-button type="primary" @click="flag = !flag">切换组件</el-button>
    <KeepAlive :include="'KeepAliveBoy'" :exclude="[/'girl'/i]" :max="1">
      <KeepAliveBoy v-if="flag"></KeepAliveBoy>
      <KeepAliveGirl v-else></KeepAliveGirl>
    </KeepAlive>
  </div>
</template>

<style lang="css" scoped></style>
