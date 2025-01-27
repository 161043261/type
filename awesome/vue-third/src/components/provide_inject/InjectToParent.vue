<script lang="ts" setup>
import { inject, type Ref } from 'vue';
import InjectToChild from './InjectToChild.vue';

const injectedColor = inject<Ref<string>>('colorKey')
</script>

<template>
  <div>
    <em>InjectToParent</em>
    <div class="box">
    </div>
    <InjectToChild></InjectToChild>
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
