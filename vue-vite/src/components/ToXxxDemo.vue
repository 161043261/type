<script lang="ts" setup>
import { onUpdated, reactive, ref, toRaw, toRef, toRefs } from 'vue'

const obj = { name: 'whoami', age: 1 }
// 错误实践: toRef, toRefs 一个普通对象
const age = toRef(obj, 'age')

function addAge() {
  obj.age += 1
  console.log(obj, age.value)
}

const obj2 = ref({ name: 'whoami2', age: 2 })
const _age2 = toRef(obj2.value, 'age')
const { name: name2, age: age2 } = toRefs(obj2.value)
function addName2() {
  name2.value += '!'
  console.log(obj2.value.name, name2.value)
}
function addAge2() {
  obj2.value.age++
  console.log(obj2.value.age, _age2.value, age2.value)
}

const obj3 = reactive({ name: 'whoami3', age: 3 })
const _age3 = toRef(obj3, 'age')
const { name: name3, age: age3 } = toRefs(obj3)
function addName3() {
  name3.value += '!'
  console.log(obj3.name, name3.value)
}
function addAge3() {
  obj3.age++
  console.log(obj3.age, _age3.value, age3.value)
}

onUpdated(() => {
  console.log(obj.age === age.value) // true
  console.log(obj2.value.name === name2.value) // true
  console.log(obj2.value.age === _age2.value && obj2.value.age === age2.value) // true
  console.log(obj3.name === name3.value) // true
  console.log(obj3.age === _age3.value && obj3.age === age3.value) // true
})

function testToRaw() {
  //! {name: 'whoami', age: 1} {name: 'whoami', age: 1}
  console.log(obj, toRaw(obj))
  //! Ref<Object> Reactive<Object> {name: 'whoami2', age: 2}
  console.log(obj2, obj2.value, toRaw(obj2.value))
  //! Reactive<Object> {name: 'whoami3', age: 3}
  console.log(obj3, toRaw(obj3))
}
</script>

<template>
  <div>
    <h1>toRef, toRefs, toRaw</h1>
    <div style="display: flex; justify-content: space-between">
      <div>
        <!-- 错误实践: toRef, toRefs 一个普通对象,
             响应式对象 age 值更新, 视图不会更新 (没有 track, trigger)  -->
        <p>{{ obj }}</p>
        <p>{{ age }}</p>
        <button @click="addAge">addAge</button>
      </div>

      <!-- toRef, toRefs 一个 ref/reactive 对象,
           响应式对象 name2, _age2, age 值更新, 视图也会更新 (有 track, trigger)   -->
      <div>
        <p>{{ obj2 }}</p>
        <p>{{ `${name2} ${_age2} ${age2}` }}</p>
        <button @click="addName2">addName2</button>
        <button @click="addAge2">addAge2</button>
      </div>

      <div>
        <p>{{ obj3 }}</p>
        <p>{{ `${name3} ${_age3} ${age3}` }}</p>
        <button @click="addName3">addName3</button>
        <button @click="addAge3">addAge3</button>
      </div>
    </div>

    <button @click="testToRaw">testToRaw</button>
  </div>
</template>

<style lang="css" scoped></style>
