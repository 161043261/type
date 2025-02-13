<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { toRefs } from 'vue'

const route = useRoute()
let { params } = toRefs(route)

// props 是一个布尔值时, `props: true`, 将 route.params 设置为路由组件的 props
defineProps(['id', 'title', 'content'])
</script>

<template>
  <ul class="news-list">
    <li>id: {{ params.id }}</li>
    <li>title: {{ params.title }}</li>
    <li>content: {{ params.content }}</li>

    <li>defineProps id: {{ id }}</li>
    <li>defineProps title: {{ title }}</li>
    <li>defineProps content: {{ content }}</li>
  </ul>
</template>

<style scoped>
.news-list {
  list-style: none;
  padding-left: 20px;
}

.news-list > li {
  line-height: 30px;
}
</style>
