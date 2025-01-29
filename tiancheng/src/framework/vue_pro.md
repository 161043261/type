# Vue3 高级

## KeepAlive 缓存组件

1. 默认缓存 KeepAlive 标签内的全部组件
2. include 缓存包含的组件, 支持字符串, 正则表达式或数组
3. exclude 不缓存排除的组件
4. max 缓存的最大组件数, 如果实际组件数 > max, 则使用 LRU 算法计算缓存哪些组件

```vue
<script lang="ts" setup>
import { ref } from "vue";
import KeepAliveBoy from "./KeepAliveBoy.vue";
import KeepAliveGirl from "./KeepAliveGirl.vue";

const flag = ref(true);
</script>

<template>
  <div>
    <el-button type="primary" @click="flag = !flag">切换组件</el-button>
    <KeepAlive :include="'KeepAliveBoy'" :exclude="[/'girl'/i]" :max="1">
      <KeepAliveBoy v-if="flag"></KeepAliveBoy>
      <KeepAliveGirl v-else></KeepAliveGirl>
    </KeepAlive>
  </div>
</template>
```

使用 KeepAlive 缓存组件时, 会增加两个生命周期 onActivated 和 onDeactivated

## Transition 动画组件

[animation.css](https://animate.style/)

```bash
pnpm install animate.css
```

Transition 生命周期钩子

- beforeEnter, enter, afterEnter, enterCancelled
- beforeLeave, leave, afterLeave, leaveCancelled

::: code-group

```vue [script]
<script lang="ts" setup>
import "animate.css";

const display = ref(true);

function enterActive(el: Element, done: () => void) {
  console.log("enterActive");
  setTimeout(() => done(), 3000);
}

function leaveActive(el: Element, done: () => void) {
  console.log("leave-active");
  setTimeout(() => done(), 3000);
}
</script>
```

```vue [template]
<template>
  <div>
    <el-button type="primary" @click="display = !display">switch</el-button>
    <!-- 等价于
    <Transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    > -->
    <!-- duration: 动画效果持续 1s -->
    <Transition
      class="animate__animated"
      enter-active-class="animate__fadeIn"
      leave-active-class="animate__fadeOut"
      :duration="1000"
      @beforeEnter="(el: Element) => console.log('beforeEnter')"
      @enter="enterActive"
      @afterEnter="(el: Element) => console.log('afterEnter')"
      @enterCancelled="(el: Element) => console.log('enterCancelled')"
      @before-leave="(el: Element) => console.log('before-leave')"
      @leave="leaveActive"
      @after-leave="(el: Element) => console.log('after-leave')"
      @leave-cancelled="(el: Element) => console.log('leave-cancelled')"
    >
      <div class="box" v-if="display">Transition</div>
    </Transition>

    <Transition name="fade">
      <!-- className prefix -->
      <div class="box" v-show="display" style="background: lightpink">
        Transition
      </div>
    </Transition>
  </div>
</template>
```

```vue [style]
<style lang="scss" scoped>
@mixin wh0 {
  width: 0;
  height: 0;
}

@mixin wh200 {
  width: 200px;
  height: 200px;
}

.box {
  @include wh200;
  background: lightblue;
}

.fade-enter-from {
  @include wh0;
  transform: rotate(360deg);
}

.fade-enter-active {
  transition: all 3s ease;
}

// .fade-enter-to {}
// .fade-leave-from {}

.fade-leave-active {
  transition: all 3s ease;
}

.fade-leave-to {
  @include wh0;
  transform: rotate(360deg);
}
</style>
```

:::

### Transition 结合 GASP

[GASP](https://gsap.com/)

```bash
pnpm add gsap
```
Transition 只能有一个直接子元素
