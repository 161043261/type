<script lang="ts" setup>
import gsap from 'gsap'
import { ref } from 'vue'

const mountOrNot = ref(true)
</script>

<template>
  <div>
    <el-button type="success" @click="mountOrNot = !mountOrNot">switch</el-button>
    <Transition
      @beforeEnter="
        (el: Element) => {
          gsap.set(el, {
            width: 0,
            height: 0,
          })
        }
      "
      @enter="
        // type Callback = (...args: any[]) => void | null;
        (el: Element, done: gsap.Callback) => {
          gsap.to(el, {
            width: 200,
            height: 200,
            onComplete: done,
          })
        }
      "
      @leave="
        (el: Element, done: gsap.Callback) => {
          gsap.to(el, {
            width: 0,
            height: 0,
            onComplete: done,
          })
        }
      "
    >
      <div v-if="mountOrNot" class="box">Transition With GASP</div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.box {
  height: 200px;
  width: 200px;
  background: lightgreen;
}
</style>
