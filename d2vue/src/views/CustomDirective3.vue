<script setup lang="ts">
import type { Directive, DirectiveBinding } from 'vue'

const vDrag: Directive<HTMLElement, void> = (el: HTMLElement, binding: DirectiveBinding) => {
  const dragEl = el.firstElementChild as HTMLDivElement
  console.log(dragEl, binding)
  dragEl.addEventListener('mousedown', (downEvent: MouseEvent) => {
    const dx = downEvent.clientX - el.offsetLeft
    const dy = downEvent.clientY - el.offsetTop

    const onMousemove = (moveEvent: MouseEvent) => {
      // console.log(ev);
      el.style.left = moveEvent.clientX - dx + 'px'
      el.style.top = moveEvent.clientY - dy + 'px'
    }
    document.addEventListener('mousemove', onMousemove)
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', onMousemove)
    })
  })
}
</script>

<template>
  <img src="@/assets/mouse_event.png" alt="mouse_event" />
  <div class="box" v-drag>
    <div class="head">head</div>
    <main>content</main>
  </div>
</template>

<style scoped lang="css">
.box {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
  background: azure;

  .head {
    height: 60px;
    width: 200px;
    background: skyblue;
  }
}
</style>
