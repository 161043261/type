<script lang="ts" setup>
import { ref } from 'vue'
import KeepAliveBoy from './KeepAliveBoy.vue'
import KeepAliveGirl from './KeepAliveGirl.vue'

const flag = ref(true)
</script>

<template>
  <div>
    <KeepAliveBoy v-if="flag"></KeepAliveBoy>
    <KeepAliveGirl v-else></KeepAliveGirl>
  </div>
</template>

<style lang="css" scoped></style>
