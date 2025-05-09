<script lang="ts" setup>
import { reactive, readonly } from 'vue'

const formData = reactive({
  name: 'whoami',
  age: 22,
})

function submit() {
  console.log(formData)
}

const itemsProxy = reactive<string[]>([])
const readonlyItemsProxy = readonly(itemsProxy)

function addItem() {
  setTimeout(() => {
    const res = ['item']
    // reactive 返回一个代理对象 itemsProxy
    // 不能对该代理对象 itemsProxy 直接赋值, 否则会失去响应式
    //// itemsProxy = res
    readonlyItemsProxy.push(...res)
    console.log(itemsProxy, readonlyItemsProxy)
    itemsProxy.push(...res)
    console.log(itemsProxy, readonlyItemsProxy)
  })
}
</script>

<template>
  <h1>reactive, shallowReactive</h1>
  <div>
    <form>
      name: <input type="text" v-model="formData.name" /> age:
      <input type="text" v-model="formData.age" />
      <!-- 表单中的按钮, 默认 type="submit"
      阻止默认的事件行为
      1. 显式指定 type="button"
      2. 使用 .prevent 修饰符, 即 event.preventDefault() -->

      <!-- <button @click="submit">submit</button> -->
      <!-- <button @click="submit" type="button">submit</button> -->
      <button @click.prevent="submit">submit</button>
    </form>

    <ul style="display: flex; justify-content: space-between">
      <!-- 使用索引 idx 作为 key 是错误实践 -->
      <li v-for="(item, idx) of itemsProxy" :key="idx">{{ item }}</li>
    </ul>
    <ul style="display: flex; justify-content: space-between">
      <!-- 使用索引 idx 作为 key 是错误实践 -->
      <li v-for="(item, idx) of readonlyItemsProxy" :key="idx">{{ item }}</li>
    </ul>
    <button @click="addItem">addItem</button>
  </div>
</template>

<style lang="css" scoped></style>
