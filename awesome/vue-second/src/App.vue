<script lang="ts" setup>
import AsReadonly from '@/components/shallow/Readonly.vue'
import RefReactive from '@/components/shallow/RefReactive.vue'
import CustomRef from '@/components/CustomRef.vue'
import ToRawMarkRaw from '@/components/ToRawMarkRaw.vue'
import AsTeleport from '@/components/teleport/Parent.vue'
import AsSuspense from '@/components/suspense/Parent.vue'
// import Demo from './Demo.vue' // unnecessary
</script>

<template>
  <div class="app">
    <Demo />
    <!-- global component -->

    <!-- beautify: global instruction -->
    <!-- x: global property -->
    <p v-beautify="' (beautified)'">{{ x }}</p>
    <AsReadonly />
    <RefReactive />
    <CustomRef />
    <ToRawMarkRaw />
    <AsTeleport />
    <AsSuspense />
  </div>
</template>

<style>
* {
  font-family: 'Hack', 'Fira Code', 'Menlo', 'PingFang SC', 'Microsoft YaHei', monospace;
}
</style>
