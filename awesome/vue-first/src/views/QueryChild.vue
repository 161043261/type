<script lang="ts" setup>
import { toRefs } from 'vue'
import { useRoute } from 'vue-router'

defineProps(['id', 'title', 'content'])

const route = useRoute()
// destruct assignment
let { query } = toRefs(route) //query is NO LONGER reactive!!! (refer to ./ToRefs.vue)
</script>

<template>
  <ul class="news-list">
    <li>id: {{ query.id }}</li>
    <li>title: {{ query.title }}</li>
    <li>content: {{ query.content }}</li>

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
