<script setup lang="ts">
// import useResize from '@/utils'
// import { onMounted } from 'vue'
// onMounted(() => {
//   useResize(document.querySelector('#resize') as HTMLElement, (contentRect) =>
//     console.log(contentRect),
//   )
// })
</script>

<template>
  <main>
    <div v-resize="(rect: DOMRectReadOnly) => console.log(rect) /** callback */" id="resize"></div>
  </main>
</template>

<style scoped lang="css">
#resize {
  width: 200px;
  height: 200px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: lightblue;
  resize: both;
  overflow: hidden; /** BFC */
}
</style>
