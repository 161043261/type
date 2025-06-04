<script setup lang="ts">
import CustomHookChild from './CustomHookChild.tsx'
import { useCustomHook } from './CustomHookChild.tsx'

useCustomHook({ el: '#img' }).then((val) => console.log('baseUrl:', val.baseUrl))
</script>

<template>
  <main>
    <img id="img" width="300" height="300" src="@/assets/logo.svg" />
    <CustomHookChild a="aa" b="bb" c="cc"></CustomHookChild>
  </main>
</template>

<style scoped lang="css"></style>
