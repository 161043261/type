<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { data } from '../assets/list.json'

type Item = {
  name: string
  price: number
  id: number
}

const router = useRouter() // useRouter() 获取路由器对象, 等价于 template 中使用 $router

// 路由传参
// 1. 使用 Pinia 缓存
// 2. query: URL 查询参数 (URL query parameters)
// 3. state
// 4. 路由前置守卫
function routeJumpByQuery(item: Item) {
  router.push({
    path: '/register',
    // name: 'Register', // 不需要指定路由组件的名字
    // query: URL 查询参数 http://localhost:5173/register?name=item1&price=1000&id=1
    query: item, // query 不接受基本类型
    state: item, // window.history.state = item
  })
}

// 5. params: URL 路径参数 (URL path parameters)
function routeJumpByParams(item: Item) {
  router.push({
    name: 'RegisterWithId', // 必须指定路由组件的名字
    // params: URL 路径参数 http://localhost:5173/register/1
    params: {
      id: item.id,
    },
  })
}
</script>

<template>
  <div class="login">Login</div>
  <table>
    <thead>
      <tr>
        <th>brand</th>
        <th>price</th>
        <th>operation</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="item of data" :key="item.id">
        <th>{{ item.name }}</th>
        <th>{{ item.price }}</th>
        <th>
          <button @click="routeJumpByQuery(item)">routeJumpByQuery</button>
          <button @click="routeJumpByParams(item)">routeJumpByParams</button>
        </th>
      </tr>
    </tbody>
  </table>
</template>

<style scoped lang="css">
.login {
  background: lightpink;
  width: 100px;
  height: 100px;
  font-size: 1.5rem;
  color: #fff;
}

table {
  border: 1px solid #ccc;
  /* 相邻单元格共用一条边框 */
  border-collapse: collapse;
  /* 相邻单元格边框间的距离 = 0 */
  border-spacing: 0;

  th,
  td {
    border: 1px solid #000;
    padding: 10px;
    text-align: center;
  }
}
</style>
