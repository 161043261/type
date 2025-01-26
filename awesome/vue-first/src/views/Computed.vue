<script lang="ts" setup>
import { computed, onMounted, ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'

let firstName: Ref<string> = ref<string>('ayaka')
let lastName: Ref<string> = ref<string>('kamisato')

// READONLY computed property
let readonlyFullName = computed(() => {
  return (
    lastName.value.slice(0, 1).toUpperCase() +
    lastName.value.slice(1) +
    ' ' +
    firstName.value.slice(0, 1).toUpperCase() +
    firstName.value.slice(1)
  )
})

// console.log(fullName); // ComputedRefImpl

// @Deprecated
function getReadonlyFullName() {
  return (
    lastName.value.slice(0, 1).toUpperCase() +
    lastName.value.slice(1) +
    ' ' +
    firstName.value.slice(0, 1).toUpperCase() +
    firstName.value.slice(1)
  )
}

// MUTABLE computed property
let mutableFullName = computed({
  get() {
    return (
      lastName.value.slice(0, 1).toUpperCase() +
      lastName.value.slice(1) +
      ' ' +
      firstName.value.slice(0, 1).toUpperCase() +
      firstName.value.slice(1)
    )
  },
  set(arg) {
    ;[lastName.value, firstName.value] = arg.split(' ')
  }
})

function changeFullName() {
  mutableFullName.value = 'Yae Miko'
}

const router = useRouter()
onMounted(() => {
  console.log('parent mounted')
  setTimeout(() => {
    // router.push("/hook")
  }, 5000)
})
</script>

<template>
  <div class="computed">
    <p>computed</p>
    firstName: <input v-model="firstName" type="text" /> lastName:
    <input v-model="lastName" type="text" />
    <hr />
    <p>readonlyFullName: {{ readonlyFullName }}</p>
    <p>getReadonlyFullName() = {{ getReadonlyFullName() }}</p>
    <p>mutableFullName: {{ mutableFullName }}</p>
    <button @click="changeFullName">reset fullName</button>
  </div>
</template>

<style scoped>
.computed {
  background-color: lightgreen;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
  line-height: 10px;
}
</style>
