<script setup lang="ts">
import { ref } from 'vue'
import ModelChild from './ModelChild.vue'

const isShow = ref<boolean>(true)
const text = ref<string>('云深不知处')
</script>

<template>
  <main>
    <p>v-model 父组件</p>
    <div>isShow: {{ isShow }}</div>
    <div>text: {{ text }}</div>
    <div><button @click="isShow = !isShow">switch</button></div>
    <ModelChild v-model:modelValue="isShow" v-model:textVal.myModifier="text"></ModelChild>
    <!-- 等价于
    v-bind props 属性名: modelValue
    v-on   emit 事件名: update:modelValue, update:model-value
    -->
    <ModelChild
      v-bind:modelValue="isShow"
      @update:model-value="(newVal) => (isShow = newVal)"
      v-bind:textVal="text"
      @update:text-val="(newVal) => (text = newVal)"
    ></ModelChild>
  </main>
</template>

<style scoped lang="css">
.main {
  background: azure;
}
</style>
