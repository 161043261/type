<script setup lang="ts">
import type { Directive, DirectiveBinding } from 'vue'
localStorage.setItem('userId', '161043261')
// mock 后端返回的数据
const permissions = [
  '161043261:item:create',
  '161043261:item:update' /** , '161043261:item:delete' */,
]
const userId = localStorage.getItem('userId') as string

const vIsShow: Directive<HTMLElement, string> = (
  el: HTMLElement,
  binding: DirectiveBinding<string>,
) => {
  // console.log(el, binding)
  if (!permissions.includes(userId + ':' + binding.value)) {
    el.style.display = 'none' // 如果没有权限, 则隐藏对应的按钮
  }
}
</script>

<template>
  <main>
    <div>
      <button v-is-show="'item:create'">创建</button>
      <button v-is-show="'item:update'">更新</button>
      <button v-is-show="'item:delete'">删除</button>
    </div>
  </main>
</template>

<style scoped lang="css"></style>
