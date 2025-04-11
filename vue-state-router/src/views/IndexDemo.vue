<script setup lang="ts"></script>

<template>
  <div class="index">
    <div>Index</div>
    <!-- 对于动态导入的路由组件, 不要指定 name, 指定 path -->
    <RouterLink to="/demo">Demo</RouterLink>
    <RouterLink to="/demo2">Demo2</RouterLink>
    <RouterLink :to="{ path: '/demo3' }">Demo3</RouterLink>
  </div>
</template>

<style scoped lang="css">
.index {
  width: 200px;
  height: 200px;
  background: #fff;
  color: red;
  text-align: center;
  line-height: 200px;
  border: 1px solid #ccc;
  border-radius: 200px;
}
</style>
