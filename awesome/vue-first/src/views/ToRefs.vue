<script lang="ts" setup>
import { reactive, toRef, type ToRef, type ToRefs, toRefs } from 'vue'

let people = reactive<{ username: string; age: number }>({
  username: 'Brendan Eich',
  age: 0 // people.username and people.age are reactive
})

// destruct assignment
// let {username, age} = people; // username and age are NO LONGER reactive!!!
let { username, age }: ToRefs<{ username: string; age: number }> = toRefs(people) // username and age are reactive
// console.log(toRefs(people));

let refAge: ToRef<number> = toRef(people, 'age')

// console.log(refAge);
function changeName() {
  // people.username += '~';
  username.value = username.value + '!'
}

function changeAge() {
  // people.age += 1;
  age.value += 1
}
</script>

<template>
  <div class="toRefs">
    <p>toRef and toRefs</p>
    <p>username: people.username={{ people.username }}, username={{ username }}</p>
    <p>age: people.age={{ people.age }}, age={{ age }}, refAge={{ refAge }}</p>
    <button @click="changeName">change name</button>
    <button @click="changeAge">change age</button>
  </div>
</template>

<style scoped>
.toRefs {
  background-color: lightpink;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}

button {
  margin: 0 5px;
}
</style>
