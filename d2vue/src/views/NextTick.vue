<script setup lang="ts">
import { reactive, ref, useTemplateRef, nextTick } from 'vue'

const itemList = reactive([
  { name: 'item1', id: 1 },
  { name: 'item2', id: 2 },
])

const ipt = ref('')
const box = useTemplateRef<HTMLDivElement>('box')

//! Vue 同步更新数据, 异步更新 DOM
// 所以滚动位置 scrollTop 不会实时更新
function addItem() {
  itemList.push({ name: ipt.value, id: itemList.length })
  // 同步代码执行后, 异步更新 DOM

  // nextTick 可以接收一个回调函数

  // 对于 60fps 的屏幕, 1 帧是 1000/60 = 16.7ms, 浏览器在 1 帧中:
  // 1. 处理用户事件: 例如 change, click, input 等
  // 2. 执行定时器任务
  // 3. 执行 requestAnimationFrame
  // 4. 执行 DOM 的重绘 (有关颜色的..., 性能开销小) 和回流 (重排, 有关宽高的..., 性能开销大)
  // 5. 其他, 如果有空闲时间, 则执行 requestIdleCallback (IDLE 期间可以懒加载 JS 脚本)

  nextTick(
    () => {
      // Vue 异步更新 DOM,
      // Vue 将 DOM 更新加入更新队列, 等到下一个事件循环时, 才批量更新 DOM
      // nextTick 延迟执行回调函数 (Promise.then()), 即等待下一个事件循环 DOM 更新后, 再执行 callback
      box.value!.scrollTop = 520520520 // 更新滚动位置
    } /** callback */,
  )
}

async function addItem2() {
  itemList.push({ name: ipt.value, id: itemList.length })
  await nextTick() // 等待下一个事件循环结束 (DOM 已更新)
  box.value!.scrollTop = 520520520 // 更新滚动位置
}
</script>

<template>
  <main>
    <div ref="box" class="wrapper">
      <TransitionGroup
        enter-active-class="animate__animated animate__flipInY"
        leave-active-class="animate__animated animate__flipOutY"
      >
        <div class="item" v-for="item in itemList" :key="item.name">
          <div>id: {{ item.id }}, name: {{ item.name }}</div>
        </div>
      </TransitionGroup>

      <!-- ipt: input -->
      <div class="ipt">
        <textarea v-model="ipt" type="text"></textarea>
        <button @click="addItem">addItem</button>
        <button @click="addItem2">addItem2</button>
      </div>
    </div>
  </main>
</template>

<style scoped lang="css">
.wrapper {
  width: 70vw;
  height: 30vh;
  border: 1px solid #ccc;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;

  .item {
    width: 100%;
    border: 1px solid #ccc;
    background: lightyellow;
    padding: 5px;
    border-radius: 5px;
  }

  .ipt {
    margin-top: 5px;
    width: 100%;
    display: flex;
    justify-content: space-between;

    textarea {
      padding: 5px;
      resize: horizontal;
    }
  }
}
</style>
