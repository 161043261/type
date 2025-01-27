<script lang="ts" setup>
import { inject, ref, type Ref } from 'vue';
const injectedColor = inject<Ref<string>>('colorKey', ref('lightyellow') /** defaultVal */)
</script>

<template>
  <div>
    <em>InjectToChild</em>
    <div class="box">
    </div>
    <button @click="injectedColor = 'lightyellow'">Child 修改 GrandParent 注入的颜色</button>
  </div>
</template>

<style lang="css" scoped>
/* Vue3 的 css 中也有 v-bind */
.box {
  height: 50px;
  width: 50px;
  border: 1px solid #ccc;
  background: v-bind(injectedColor);
}
</style>
