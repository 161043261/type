<script setup lang="ts">
import PiniaDemo from './components/PiniaDemo.vue'
import PiniaDemo2 from './components/PiniaDemo2.vue'
</script>

<template>
  <div>
    <PiniaDemo />
    <PiniaDemo2 />
  </div>
</template>

<style lang="css">
* {
  font-family: 'Iosevka', 'Menlo', 'DejaVu Sans Mono', 'Cascadia Code', 'PingFang SC',
    'Microsoft YaHei', monospace;
}

button {
  border-radius: 10px;
  border: 1px solid lightpink;
  background-color: white;
  padding: 10px;
  cursor: pointer;
  transition: 0.5s all;
}

button:hover {
  box-shadow: 0 0 5px lightpink;
}
</style>
