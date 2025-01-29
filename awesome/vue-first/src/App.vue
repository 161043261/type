<script lang="ts" setup>
import Cat from '@/components/pinia/Cat.vue'
import Count from '@/components/pinia/Count.vue'
import { type CatList } from '@/types'
import { reactive, ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import AsLifeCycle from './components/LifeCycle.vue'
import AsProp from './components/Prop.vue'
import AsReactive from './components/Reactive.vue'
import AsRef from './components/Ref.vue'
import AsSetup from './components/Setup.vue'
import AsTagRef from './components/TagRef.vue'
import WatchEffect from './components/watch/WatchEffect.vue'
import WatchGetter from './components/watch/WatchGetter.vue'
import WatchReactiveObject from './components/watch/WatchReactiveObject.vue'
import WatchRefObject from './components/watch/WatchRefObject.vue'
import WatchRefPrimaryValue from './components/watch/WatchRefPrimaryValue.vue'

let componentTagRef = ref()

function componentTagRefLog() {
  console.log(componentTagRef)
}

let catList: CatList = reactive<CatList>([
  { id: 0, name: 'Meow', age: 1 },
  { id: 1, name: 'HappyCat', age: 2 },
  { id: 2, name: 'Tomcat', age: 3, optional: 250 }
])
// console.log(catList);

let display = ref(true)
</script>

<template>
  <div class="app">
    <p class="title">ts-vue</p>
    <div class="navigate">
      <RouterLink active-class="act" to="/computed">computed</RouterLink>
      <RouterLink active-class="act" v-bind:to="{ path: '/torefs' }">ToRefs</RouterLink>
      <RouterLink active-class="act" v-bind:to="{ name: 'hookComponent' }">hook</RouterLink>
      <RouterLink active-class="act" to="/query">query</RouterLink>
      <!-- push, replace (default push) -->
      <RouterLink active-class="act" replace to="/param">param</RouterLink>

      <!-- inter-component communication -->
      <RouterLink active-class="act" to="/props">props</RouterLink>
      <RouterLink active-class="act" to="/event">$event</RouterLink>
      <RouterLink active-class="act" to="/mitt">mitt</RouterLink>
      <RouterLink active-class="act" to="/model">v-model:</RouterLink>
      <RouterLink active-class="act" to="/attrs">$attrs</RouterLink>
      <RouterLink active-class="act" to="/refs-parent">$refs $parent</RouterLink>
      <RouterLink active-class="act" to="/provide-inject">provide inject</RouterLink>
      <RouterLink active-class="act" to="/slot">slot</RouterLink>
      <RouterLink active-class="act" to="/slot/scoped">scoped slot</RouterLink>
    </div>

    <div class="main-content">
      <RouterView></RouterView>
    </div>
    <AsSetup />
    <!-- <TagName props/> -->
    <AsReactive />
    <AsRef />
    <WatchRefPrimaryValue />
    <WatchRefObject />
    <WatchReactiveObject />
    <WatchGetter />
    <WatchEffect />
    <AsTagRef ref="componentTagRef">
      <!-- ./components/TagRef.vue:18 -->
      <button @click="componentTagRefLog">componentTagRefLog</button>
    </AsTagRef>
    <!-- <AsDefineProp :args="['data', 'passed', 'from', 'parent']" v-bind:cats="catList"/> -->
    <AsProp v-bind:cats="catList" />
    <AsLifeCycle v-if="display" />
    <Count />
    <Cat />
  </div>
</template>

<style>
* {
  font-family: 'Iosevka', 'Menlo', 'DejaVu Sans Mono', 'Cascadia Code', 'PingFang SC',
    'Microsoft YaHei', monospace;
}

button {
  margin: 0 5px;
}
</style>

<style scoped>
.app {
  background-color: lightyellow;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}

.title {
  text-align: center;
  word-spacing: 5px;
  margin: 30px 0;
  height: 70px;
  line-height: 70px;
  background-image: linear-gradient(45deg, lightyellow, lightblue);
  border-radius: 10px;
  box-shadow: 0 0 2px;
  font-size: 30px;
}

.navigate {
  display: flex;
  justify-content: space-around;
  margin: 0 100px;
}

.navigate a {
  display: block;
  text-align: center;
  width: 100px;
  height: 40px;
  line-height: 20px;
  border-radius: 10px;
  background-color: lightpink;
  text-decoration: none;
  font-size: 20px;
}

.navigate a.act {
  background-color: lightblue;
  font-weight: 800;
  text-shadow: 0 0 1px;
  font-family: 'Iosevka', 'Menlo', 'DejaVu Sans Mono', 'Cascadia Code', 'PingFang SC',
    'Microsoft YaHei', monospace;
}

.main-content {
  margin: 30px auto 0;
  border-radius: 10px;
  width: 100%;
  height: 700px;
  border: 1px solid;
}
</style>
