<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { toRefs } from 'vue'

const route = useRoute()
let { params } = toRefs(route)
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
