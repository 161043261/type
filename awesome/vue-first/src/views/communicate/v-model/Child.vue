<script lang="ts" setup>
defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])
console.log(emits)
</script>

<template>
  <p>@/views/communicate/v-model/Child.vue</p>
  modelValue: {{ modelValue }}
  <p>
    <!--
TODO
    v-bind:                         is equivalent to    :
    v-bind:propName="expression"    is equivalent to    :propName="expression"
    v-on:                           is equivalent to    @
    v-on:event-name="expression"    is equivalent to    @event-name="expression"
    -->

    <!-- refer to ../custom-event -->
    <input
      type="text"
      v-bind:value="modelValue"
      @input="
        (event: Event) => {
          // console.log((event.target as HTMLInputElement).value)
          emits('update:modelValue', (event.target as HTMLInputElement).value)
        }
      "
    />

    <input
      type="text"
      :value="modelValue"
      @input="emits('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <!-- trigger 'update:modelValue' event -->
  </p>
</template>

<style scoped>
input {
  border: 2px solid black;
  background-image: linear-gradient(45deg, lightpink, white, lightblue);
  height: 30px;
  font-size: 20px;
  color: black;
  margin: 0 5px;
}
</style>
