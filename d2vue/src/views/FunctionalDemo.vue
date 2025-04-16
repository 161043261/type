<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { h, reactive } from 'vue'

const list = reactive([
  { id: 1, name: 'item1', age: 11 },
  { id: 2, name: 'item2', age: 22 },
  { id: 3, name: 'item3', age: 33 },
])

interface IProps {
  type: 'success' | 'error'
}

// Vue 函数式编程
const OperateButton = (props: IProps, ctx: any /** { emit, slots } */) => {
  return h(
    /* HyperScript */ 'button', // type
    {
      style: { color: props.type === 'success' ? 'green' : 'red' },
      onClick: () => {
        console.log(ctx)
      },
    }, // props
    ctx.slots.default(), // children
  )
}
</script>

<template>
  <main>
    <table>
      <thead>
        <tr>
          <th>name</th>
          <th>age</th>
          <th>operate</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item of list" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.age }}</td>
          <td>
            <OperateButton type="success">修改</OperateButton>
            <OperateButton type="error">删除</OperateButton>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<style scoped lang="css">
table,
tr,
th,
td {
  border: 1px solid #ccc;
  border-collapse: collapse;
  text-align: center;
  padding: 5px;
}
</style>
