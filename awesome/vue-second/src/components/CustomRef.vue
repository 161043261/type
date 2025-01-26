<script lang="ts" setup>
import { ref } from 'vue'

import useCustomRefMsg from '@/hooks/useCustomRefMsg'

let refMsg = ref('Hello World')
let { customRefMsg } = useCustomRefMsg('Hello World', 3000)
</script>

<template>
  <div class="customRef">
    <p><em>***** customRef *****</em></p>
    <p>Immediate Response : {{ refMsg }}</p>
    <p>Delayed Response for 3s: {{ customRefMsg }}</p>
    <input v-model="refMsg" type="text" />
    <input v-model="customRefMsg" type="text" />
  </div>
</template>

<style>
* {
  font-family: 'Hack', 'Iosevka', 'Menlo', 'PingFang SC', 'Microsoft YaHei', monospace;
}

.customRef {
  background-color: lightblue;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}

input {
  margin-right: 5px;
}
</style>
