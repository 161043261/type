<script lang="ts" setup>
import Child from './Child.vue'
</script>

<template>
  <div class="parent">
    <p><em>***** suspense (experimental) *****</em></p>
    <!-- Component <Child>: setup function returned a promise, -->
    <!-- but no <Suspense> boundary was found in the parent component tree. -->
    <!-- A component with async setup() must be nested in a <Suspense> in order to be rendered. -->
    <Suspense>
      <template v-slot:default>
        <Child />
      </template>
      <template v-slot:fallback>
        <p>axios getting</p>
      </template>
    </Suspense>
  </div>
</template>

<style scoped>
.parent {
  background-color: lightblue;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}
</style>
