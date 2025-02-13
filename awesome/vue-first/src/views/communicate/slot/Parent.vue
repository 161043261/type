<script lang="ts" setup>
import Child from './Child.vue'
import { reactive, ref } from 'vue'

let games = reactive([
  { id: '1', name: 'Honkai Impact' },
  { id: '2', name: 'Genshin Impact' },
  { id: '3', name: 'Honkai: Star Rail' }
])

let imageUrl = ref('/avatar.jpg')
let videoUrl = ref('/video.mp4')
</script>

<template>
  <div class="parent">
    <p>@/views/communicate/slot/Parent.vue</p>
    <div class="content">
      <Child>
        <template v-slot:s2>
          <!-- slot 's2' -->
          <ul>
            <li v-for="game in games" v-bind:key="game.id">{{ game.name }}</li>
          </ul>
        </template>
        <!-- v-slot: is equivalent to # -->
        <template #s1>
          <!-- slot 's1' -->
          <p>game list</p>
        </template>
      </Child>

      <Child title="image">
        <!-- slot 'default' -->
        <img alt="/avatar.jpg" v-bind:src="imageUrl" />
      </Child>

      <Child title="video">
        <!-- default slot -->
        <video controls v-bind:src="videoUrl"></video>
      </Child>
    </div>
  </div>
</template>

<style scoped>
.parent {
  background-color: lightblue;
  padding: 20px;
  border-radius: 10px;
}

.content {
  display: flex;
  justify-content: space-evenly;
}

img,
video {
  width: 100%;
}

p {
  text-align: center;
}
</style>
