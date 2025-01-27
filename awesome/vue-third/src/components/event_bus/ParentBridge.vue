<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import { ref } from 'vue'
import BoyDemo from './BoyDemo.vue'
import GirlDemo from './GirlDemo.vue'

const flag = ref<boolean>(false)
const timestamp = ref<number>(0)

function rxArgs(flag_: boolean, timestamp_: number) {
  flag.value = flag_
  timestamp.value = timestamp_
}
</script>

<template>
  <div>
    <BoyDemo @custom-event="(flag: boolean, timestamp: number) => rxArgs(flag, timestamp)" />
    <GirlDemo :flag="flag" :timestamp="timestamp" />
  </div>
</template>

<style lang="css" scoped></style>
