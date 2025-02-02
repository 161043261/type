<script setup lang="ts"></script>

<template>
  <div class="index">
    <div>********** Index **********</div>
    <!-- 动态添加的路由组件不要使用 name, 使用 path -->
    <RouterLink to="/demo">Demo</RouterLink>
    <RouterLink :to="{ path: '/demo2' }">Demo2</RouterLink>
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
