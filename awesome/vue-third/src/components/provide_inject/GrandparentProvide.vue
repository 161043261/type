<script lang="ts" setup>
import { provide, ref } from 'vue'
import InjectToParent from './InjectToParent.vue'

const colorVal = ref('lightpink')
provide('colorKey' /** key */, colorVal /** value */)
// 也可以提供一个 readonly 的 colorVal, 防止子组件修改
// provide('colorKey', readonly(colorVal))
</script>

<template>
  <div>
    <h1>provide/inject</h1>
    <em>GrandParent provides `ref(color)`</em>
    <label>
      <input type="radio" value="lightpink" name="color" v-model="colorVal" /> lightpink
    </label>
    <label>
      <input type="radio" value="lightgreen" name="color" v-model="colorVal" /> lightgreen
    </label>
    <label>
      <input type="radio" value="lightblue" name="color" v-model="colorVal" /> lightblue
    </label>
    <div class="box"></div>
    <InjectToParent></InjectToParent>
  </div>
</template>

<style lang="css" scoped>
/* Vue3 的 css 中也有 v-bind */
.box {
  height: 50px;
  width: 50px;
  border: 1px solid #ccc;
  background: v-bind(colorVal);
}
</style>
