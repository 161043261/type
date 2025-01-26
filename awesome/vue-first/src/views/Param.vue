<script lang="ts" setup>
import { reactive } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const newsList = reactive([
  { id: 1, title: 'Express', content: 'expressjs.com' },
  { id: 2, title: 'React', content: 'react.dev' },
  { id: 3, title: 'Vue', content: 'vuejs.org' }
])
</script>

<template>
  <div class="news">
    <ul>
      <li v-for="news in newsList" v-bind:key="news.id">
        <!-- <RouterLink v-bind:to="`/param/child/${news.id}/${news.title}/${news.content}`">{{ news.title }}</RouterLink> -->
        <RouterLink
          v-bind:to="{
            // path: '/param/child',
            name: 'paramChild',
            params: {
              // spring @PathVariable
              id: news.id,
              title: news.title,
              content: news.content
            }
          }"
          >{{ news.title }}
        </RouterLink>
      </li>
    </ul>
    <div class="news-content">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped>
.news {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  height: 100%;
}

.news ul {
  margin-top: 30px;
  /* list-style: none; */
  padding-left: 10px;
}

.news li::marker {
  color: red;
}

.news li > a {
  font-size: 20px;
  line-height: 40px;
  text-decoration: none;
  /* text-shadow: 0 0 20px rgb(0, 80, 0); */
}

.news-content {
  width: 70%;
  height: 90%;
  border: 1px solid;
  margin-top: 20px;
  border-radius: 10px;
}
</style>
