<script lang="ts" setup>
import { ref } from 'vue'
import 'animate.css'

const displayOrNot = ref(true)

function enterActive(el: Element, done: () => void) {
  console.log('enterActive')
  setTimeout(() => done(), 3000)
}

function leaveActive(el: Element, done: () => void) {
  console.log('leave-active')
  setTimeout(() => done(), 3000)
}
</script>

<template>
  <div>
    <el-button type="primary" @click="displayOrNot = !displayOrNot">switch</el-button>
    <!-- 等价于 <Transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    > -->
    <!-- duration: 过渡效果持续 1s -->
    <Transition
      class="animate__animated"
      enter-active-class="animate__fadeIn"
      leave-active-class="animate__fadeOut"
      :duration="1000"
      @beforeEnter="(el: Element) => console.log('beforeEnter')"
      @enter="enterActive"
      @afterEnter="(el: Element) => console.log('afterEnter')"
      @enterCancelled="(el: Element) => console.log('enterCancelled')"
      @before-leave="(el: Element) => console.log('before-leave')"
      @leave="leaveActive"
      @after-leave="(el: Element) => console.log('after-leave')"
      @leave-cancelled="(el: Element) => console.log('leave-cancelled')"
    >
      <div class="box" v-show="displayOrNot">Transition</div>
    </Transition>

    <Transition name="fade">
      <!-- className prefix -->
      <div class="box" v-if="displayOrNot" style="background: lightpink">Transition</div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
@mixin wh0 {
  width: 0;
  height: 0;
}

@mixin wh200 {
  width: 200px;
  height: 200px;
}

.box {
  @include wh200;
  background: lightblue;
}

.fade-enter-from {
  @include wh0;
  transform: rotate(360deg);
}

.fade-enter-active {
  transition: all 3s ease;
}

// .fade-enter-to {}
// .fade-leave-from {}

.fade-leave-active {
  transition: all 3s ease;
}

.fade-leave-to {
  @include wh0;
  transform: rotate(360deg);
}
</style>
