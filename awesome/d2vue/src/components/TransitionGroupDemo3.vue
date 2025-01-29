<script setup lang="ts">
import gsap from 'gsap'
import { reactive, watch } from 'vue'
const num = reactive({
  curVal: 0,
  tweenVal: 0,
})

watch(
  () => num.curVal, // getter
  (newVal, oldVal) => {
    console.log(newVal, oldVal)
    gsap.to(num, {
      duration: 1,
      tweenVal: newVal,
    })
  },
)
</script>

<template>
  <div>
    <el-input v-model="num.curVal" :step="20" type="number"></el-input>
    <div>
      {{ num.tweenVal.toFixed(0) }}
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
