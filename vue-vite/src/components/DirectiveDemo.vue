<script lang="ts" setup>
import { ref } from 'vue'

const cnt = ref(1)
const cnt2 = ref(1)
const addCnt = () => {
  cnt.value++
}
const addCnt2 = () => {
  cnt2.value++
}

const rawText = 'rawText'
const rawHTML = '<em>rawHTML</em>'

const evType = ref('click')
function clickHandler(ev: Event) {
  console.log('[Child] ev:', ev)
  console.log('[Child] evType:', evType)
}

const autofill = ref('')
function enterHandler(ev: Event) {
  console.log('[enterHandler] ev: ', ev)
  console.log('[enterHandler] autofill:', autofill)
  autofill.value = '自动填充的内容'
}

const inputStyle = {
  // 类似 jsx, tsx
  display: 'block',
  margin: '10px 0',
  border: 'none',
  borderRadius: '10px',
  outline: 'none',
  boxShadow: '0 0 5px lightblue',
}

//! Vue3.2 v-memo benchmark
// const bigArr = reactive<{ id: number; name: string }[]>(
//   Array.from(
//     {
//       length: 1000,
//     },
//     (_val, idx) => ({ id: idx, name: `record-${idx}` }),
//   ),
// )
// const curItem = ref(1)

// async function select(idx: number) {
//   curItem.value = idx
//   console.time()
//   await Promise.resolve()
//   console.timeEnd()
// }

const arr = ref<string[]>(['a', 'b', 'c', 'd'])
</script>

<template>
  <div>
    <h1>指令 Directives</h1>
    <div>cnt: {{ cnt }}</div>
    <div v-once>v-once cnt: {{ cnt }}</div>
    <!-- addCnt2 时, 该元素不会重新渲染 -->
    <div v-memo="[cnt]">cnt: {{ cnt }}; cnt2: {{ cnt2 }}</div>
    <button v-on:click="() => addCnt()">addCnt</button>
    <button @click="() => addCnt2()">addCnt2</button>
    <!-- v-text 会覆盖子元素, 编译后 <div>rawText</div> -->
    <div v-text="rawText"></div>
    <!-- v-html 会覆盖子元素, 编译后 <div><h1>rawHTML</h1></div> -->
    <div v-html="rawHTML"></div>
    <div
      @click="
        (ev) => {
          console.log('[Parent] ev:', ev)
        }
      "
    >
      <button v-on:[evType]="clickHandler">点击</button>
      <button @[evType]="(ev: Event) => clickHandler(ev)">点击</button>
      <!-- 阻止事件冒泡 -->
      <button @[evType].stop="clickHandler">点击</button>
    </div>

    <input
      type="text"
      @keydown.enter="enterHandler"
      v-model="autofill"
      placeholder="按 enter 键自动填充"
      :style="inputStyle"
    />
    <button @click.ctrl="(ev) => console.log(ev)">按 ctrl 键并点击</button>

    <!--! Vue3.2 v-memo benchmark -->
    <!-- <div style="column-count: 3">
    <div
      v-for="item in bigArr"
      :key="item.id"
      @click="select(item.id)"
      style="border: 1px solid black; margin-bottom: 10px; cursor: pointer"
      v-memo="[(() => item.id === curItem)()]"
    >
      id: {{ item.id }}; name: {{ item.name }}; selected: {{ item.id === curItem }}
    </div>
  </div> -->

    <!-- eslint-disable-next-line vue/require-v-for-key -->
    <span v-for="val of arr">
      {{ val }}
    </span>
    <br />

    <span :key="idx" v-for="(val, idx) of arr">
      {{ val }}
    </span>
    <br />

    <button @click="(console.log($event), arr.splice(2, 0, 'e'))">splice</button>
  </div>
</template>

<style lang="css" scoped></style>
