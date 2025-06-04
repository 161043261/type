<script lang="ts" setup>
import { computed, ref } from 'vue'

const firstName = ref('Tiancheng')
const lastName = ref('Hang')
const fullName = computed<string>({
  get() {
    return firstName.value + '-' + lastName.value
  },
  set(newVal: string) {
    // console.log(newVal);
    ;[firstName.value, lastName.value] = newVal.split('-')
  },
})

const readonlyFullName = computed<string>(() => firstName.value + '-' + lastName.value)
</script>

<template>
  <h1>计算属性 computed</h1>
  <div>
    名 <input type="text" v-model="firstName" /> 姓 <input type="text" v-model="lastName" /> 姓名
    <input type="text" v-model="fullName" />
    {{ readonlyFullName }}
  </div>
</template>

<style lang="css" scoped></style>
