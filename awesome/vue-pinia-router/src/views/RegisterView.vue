<script setup lang="ts">
import { isProxy } from 'vue'
import { useRoute } from 'vue-router'
import { data } from '../assets/list.json'
const route = useRoute() // useRoute() 获取路由对象, 等价于 template 中使用 $route
console.log(isProxy(route)) // true
const { name, price, id } = history.state
console.log(`name: ${name}, price: ${price}, id: ${id}`) // item1 1000 1
</script>

<template>
  <div>
    <div class="register">Register</div>
    <div>
      route.query.name:
      {{ route.query.name ?? data.find((val) => val.id === Number(route.params.id))?.name }}
    </div>
    <div>
      route.query.price:
      {{ route.query.price ?? data.find((val) => val.id === Number(route.params.id))?.price }}
    </div>
    <!-- query: URL 查询参数 (URL query parameters)
       params: URL 路径参数 (URL path parameters) -->
    <div>route.query.id: {{ route.query.id ?? route.params.id }}</div>
  </div>
</template>

<style scoped lang="css">
.register {
  background: lightblue;
  width: 100px;
  height: 100px;
  font-size: 1.5rem;
  color: #fff;
}
</style>
