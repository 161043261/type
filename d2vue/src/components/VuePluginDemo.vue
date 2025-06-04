<script setup lang="ts">
import { ref } from 'vue'

const isAlive = ref<boolean>(false)

function changeAlive() {
  isAlive.value = !isAlive.value
}

defineExpose({
  isAlive,
  changeAlive,
})
</script>

<template>
  <main>
    <Transition
      enter-active-class="animate__animated animate__bounceIn"
      leave-active-class="animate__animated animate__bounceOut"
    >
      <div v-if="isAlive" class="loading">Animate Animated</div>
    </Transition>
  </main>
</template>

<style scoped lang="css">
.loading {
  width: 300px;
  height: 100px;
  background: lightblue;
  color: white;
  position: fixed;
  top: 10vh;
  left: calc(50vw - 150px);
  text-align: center;
  line-height: 100px;
  border-radius: 10px;
  /* transform: translateX(-50%); */
  font-family: 'Freestyle Script';
  font-size: 3rem;
}
</style>
