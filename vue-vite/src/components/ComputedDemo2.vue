<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
interface Item {
  name: string
  price: number
  num: number
}
const items = reactive<Item[]>([
  {
    name: 'item1',
    price: 1,
    num: 1,
  },
  {
    name: 'item2',
    price: 2,
    num: 2,
  },
  {
    name: 'item3',
    price: 3,
    num: 3,
  },
])

function del(idx: number) {
  items.splice(idx, 1)
}

const keyword = ref('')
const filteredItems = computed(() => {
  return items.filter((item) => item.name.includes(keyword.value))
})

const getTotal = () => {
  return filteredItems.value.reduce((pre, cur) => pre + cur.num * cur.price, 0)
} /** getter */
const total = computed(getTotal)
</script>

<template>
  <div>
    <input type="text" placeholder="search" v-model="keyword" />
    <table>
      <thead>
        <tr>
          <th>name</th>
          <th>price</th>
          <th>num</th>
          <th>acc</th>
          <th>delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in filteredItems" :key="idx">
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <td>
            {{ item.num }}
            <button @click="item.num++">+</button>
            <button @click="item.num = item.num > 0 ? item.num - 1 : item.num">-</button>
          </td>
          <td>{{ item.price * item.num }}</td>
          <td><button @click="del(idx)">delete</button></td>
        </tr>
      </tbody>
      <tfoot>
        <!-- 计算属性 computed(getter) 会缓存计算结果, 只有依赖项更新时, 才会重新计算 -->
        total:
        {{
          total
        }}
        <!-- 直接调用 getter 不会缓存计算结果, 每次重新渲染 template 时, 都会重新计算 -->
        total:
        {{
          getTotal()
        }}
      </tfoot>
    </table>
  </div>
</template>

<style lang="css" scoped>
table {
  border: 1px solid gray;
  padding: 0;
  width: 400px;
  border-collapse: collapse;
  /* border-spacing: 0; */
}

table th,
table td {
  border: 1px solid gray;
  padding: 0;
  text-align: center;
}
</style>
