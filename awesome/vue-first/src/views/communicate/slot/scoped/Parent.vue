<script lang="ts" setup>
import Child from './Child.vue'
</script>

<template>
  <div class="parent">
    <p>@/views/communicate/slot/scoped/Parent.vue</p>
    <div class="content">
      <Child>
        <template v-slot="lProps">
          <!-- slot 'default' -->
          <p>unordered list</p>
          <ul>
            <li v-for="fun in lProps.funs" :key="fun.id">{{ fun.name }}</li>
          </ul>
        </template>
      </Child>

      <Child>
        <template #default="{ funs }">
          <!-- destruct -->
          <p>ordered list</p>
          <ol>
            <li v-for="fun in funs" :key="fun.id">{{ fun.name }}</li>
          </ol>
        </template>
      </Child>

      <Child>
        <template v-slot:s1="rProps">
          <!-- slot 's1' -->
          <p>paragraphs</p>
          <p>{{ rProps.a }} {{ rProps.b }}</p>
          <p v-for="fun in rProps.funs" :key="fun.id">{{ fun.name }}</p>
        </template>
      </Child>
    </div>
  </div>
</template>

<style scoped>
.parent {
  background-color: lightblue;
  padding: 20px;
  border-radius: 10px;
}

.content {
  display: flex;
  justify-content: space-evenly;
}

p {
  text-align: center;
}
</style>
