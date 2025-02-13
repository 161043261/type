<script lang="ts">
export default {
  name: 'Setup',
  beforeCreate() {
    console.log('beforeCreate') // vue2
  }
  // setup() { ...
  //     return { username, age, changeName, changeAge, showTel };
  //     // return () => { "Hello World"; }
  // }
}
</script>

<script lang="ts" setup>
// setup sugar
import { type Ref, ref, type UnwrapRef } from 'vue'

// console.log(this); // undefined

// data
// let username = 'Default';
let username: Ref<UnwrapRef<string>> = ref('Tom')
// let age = 0;
let age: Ref<UnwrapRef<number>> = ref(0)
let tel: string = '911'

// functions
function changeName() {
  // username = new Date().toString();
  username.value = username.value == 'Tom' ? 'Jerry' : 'Tom'
}

function changeAge() {
  // age++;
  age.value++
}

function showTel() {
  window.alert(tel)
}
</script>

<template>
  <div class="setup">
    <p>setup</p>
    <p>name: {{ username }}</p>
    <p>age: {{ age }}</p>
    <button @click="changeName">change name</button>
    <button @click="changeAge">change age</button>
    <button @click="showTel">alert tel</button>
  </div>
</template>

<style scoped>
.setup {
  background-color: lightpink;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}

button {
  margin: 0 5px;
}
</style>
