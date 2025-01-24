<script lang="ts" setup>
import Boy from './Boy.vue'
import Girl from './Girl.vue'
import { ref, type Ref } from 'vue'

let car = ref('MercedesBenz')
let age = ref(35)
let girlInstance: Ref = ref<InstanceType<typeof Girl>>()
let boyInstance: Ref = ref<InstanceType<typeof Boy>>()

function changeToy() {
  girlInstance.value.toy += '!'
}

function changeComputer() {
  boyInstance.value.computer += '!'
}

function addAge(refs: { [key: string]: any }) {
  console.log('$refs:', refs)
  for (let prop in refs) {
    console.log(prop)
    refs[prop].age++
  }
}

defineExpose({ age })
</script>

<template>
  <div class="parent">
    <p>@/views/communicate/$refs-$parent/Parent.vue</p>
    <p>$refs: parent -> child; $parent: child -> parent;</p>
    <p>car: {{ car }}</p>
    <p>age: {{ age }}</p>
    <button v-on:click="changeToy">change girl's toy</button>
    <button @click="changeComputer">change boy's computer</button>
    <!-- $refs -->
    <button @click="addAge($refs)">children.age++</button>
    <Girl ref="girlInstance" />
    <Boy ref="boyInstance" />
  </div>
</template>

<style scoped>
.parent {
  background-color: lightblue;
  padding: 20px;
  border-radius: 10px;
}

.parent button {
  margin-bottom: 10px;
  margin-left: 10px;
}
</style>
