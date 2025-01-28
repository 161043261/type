<script lang="ts" setup>

</script>

<template>
  <div>
    你好
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
