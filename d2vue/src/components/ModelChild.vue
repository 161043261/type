<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  // modelValueModifiers? : {}
  textVal: string
  textValModifiers?: {
    myModifier: boolean // 修饰符存在则为 true
  }
}>()

const emit = defineEmits(['update:modelValue', 'update:textVal'])
function closeHandler() {
  emit('update:modelValue', false)
}

function inputHandler(ev: Event) {
  console.log((ev.target as HTMLInputElement).value)
  emit('update:textVal', (ev.target as HTMLInputElement).value)
}
</script>

<template>
  <main class="main" v-if="modelValue">
    <div>v-model 子组件</div>
    <div>modelValue: {{ modelValue }}</div>
    <div>myModifier 是否存在: {{ props.textValModifiers?.myModifier ?? false }}</div>
    <div><button @click="closeHandler">close</button></div>
    <div>content: <input type="text" :value="textVal" @input="inputHandler" /></div>
  </main>
</template>

<style scoped lang="css">
.main {
  border: 1px solid #ccc;
  width: 50vw;
  padding: 5px;
}
</style>
