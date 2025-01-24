<script lang="ts" setup>
import { reactive } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'

const newsList = reactive([
  { id: 1, title: 'Express', content: 'expressjs.com' },
  { id: 2, title: 'React', content: 'react.dev' },
  { id: 3, title: 'Vue', content: 'vuejs.org' }
])

const router = useRouter()

interface INews {
  id: number
  title: string
  content: string
}

function show(news: INews) {
  router.push({
    // route.replace();
    name: 'queryChild',
    query: {
      // spring @RequestParam
      id: news.id,
      title: news.title,
      content: news.content
    }
  })
}
</script>

<template>
  <div class="news">
    <ul>
      <li v-for="news in newsList" v-bind:key="news.id">
        <!-- <RouterLink v-bind:to="`/query/child?id=${news.id}&title=${news.title}&content=${news.content}`">{{ news.title }}</RouterLink> -->
        <button @click="show(news)">show</button>
        <RouterLink
          v-bind:to="{
            // name: 'queryChild',
            path: '/query/child',
            query: {
              // spring @RequestParam
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

button {
  margin: 0 5px;
}
</style>
