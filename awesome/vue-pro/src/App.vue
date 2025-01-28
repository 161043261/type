<script lang="ts" setup>
import KeepAliveParent from './components/KeepAliveParent.vue'
import TransitionDemo from './components/TransitionDemo.vue'
</script>

<template>
  <div>
    <h1>KeepAlive</h1>
    <KeepAliveParent />
    <h1>Transition</h1>
    <TransitionDemo />
  </div>
</template>

<style lang="scss">
@mixin bfc {
  height: 100%;
  // overflow 属性值不等于 visible 的元素, 都开启了 bfc
  overflow: hidden;
}

* {
  margin: 0;
  padding: 0;
}

#app {
  @include bfc;
}
</style>
