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

## Transition 过渡/动画组件

Transition 基于状态变化

### 对比 CSS 过渡 transition 和动画 animation

|              | 过渡 transition           | 动画 animation                       |
| ------------ | ------------------------- | ------------------------------------ |
| 触发         | 需要事件触发, 例如 :hover | 可以自动触发, 例如页面加载后自动播放 |
| 状态         | 只有起始状态和结束状态    | 可以使用 @keyframes 定义多个关键帧   |
| 自动循环播放 | 不支持                    | 支持                                 |

### Transition 生命周期钩子和 animation.css

[animation.css](https://animate.style/)

```bash
pnpm install animate.css
```

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
    <!-- duration: 过渡动画持续 1s -->
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
      <div class="box" v-if="display">Transition With Animate.css</div>
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

### Transition 案例

```vue
<!-- pnpm add gsap -->
<script lang="ts" setup>
import gsap from "gsap";

const mountOrNot = ref(true);
</script>

<template>
  <div>
    <el-button type="success" @click="mountOrNot = !mountOrNot"
      >switch</el-button
    >
    <Transition
      @beforeEnter="
        (el: Element) => {
          gsap.set(el, {
            width: 0,
            height: 0,
          });
        }
      "
      @enter="
        // type Callback = (...args: any[]) => void | null;
        (el: Element, done: gsap.Callback) => {
          gsap.to(el, {
            width: 200,
            height: 200,
            onComplete: done,
          });
        }
      "
      @leave="
        (el: Element, done: gsap.Callback) => {
          gsap.to(el, {
            width: 0,
            height: 0,
            onComplete: done,
          });
        }
      "
    >
      <div v-if="mountOrNot" class="box">Transition With GASP</div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.box {
  height: 200px;
  width: 200px;
  background: lightgreen;
}
</style>
```

### TransitionGroup

- Transition 只允许一个直接子元素
- TransitionGroup 允许多个直接子元素, 例如 v-for

```vue
<script lang="ts" setup>
import { reactive } from "vue";
import "animate.css";

const list = reactive<number[]>([1, 2, 3, 4, 5]);
</script>

<template>
  <el-button @click="list.push(list.length + 1)">push</el-button>
  <el-button @click="list.pop()">pop</el-button>
  <!-- tag="section" tag 属性为多个 div 包裹一层 section 标签 -->
  <div class="wrapper">
    <TransitionGroup
      tag="section"
      enter-active-class="animate__animated animate__bounceIn"
      leave-active-class="animate__animated animate__bounceOut"
    >
      <div class="item" v-for="(item, idx) of list" :key="idx">{{ item }}</div>
    </TransitionGroup>
  </div>
</template>

<style lang="scss" scoped>
.wrapper > section {
  display: flex;
  // flex-wrap: nowrap; // 单行 flex 容器
  flex-wrap: wrap; // 多行 flex 容器
  border: 1px solid #ccc;
  .item {
    margin: 0 10px;
  }
}
</style>
```

### TransitionGroup 案例

```vue
<!-- pnpm i lodash @types/lodash -->
<script lang="ts" setup>
import { ref } from "vue";
import { shuffle } from "lodash";

// [undefined, undefined, undefined]
// new Array(3).fill(undefined)
// 等价于 Array.from({ length: 3 })
// 等价于 Array.apply(null, { length: 3 })
const list = ref(
  Array.apply(null, {
    length: 81,
  } as number[]).map((val, idx) => ({
    id: idx,
    val: (idx % 9) + 1,
  })),
);

function shuffleList() {
  list.value = shuffle(list.value);
}
</script>

<template>
  <div>
    <el-button @click="shuffleList">shuffleList</el-button>
    <!-- move-class: 平移的过渡效果 -->
    <TransitionGroup move-class="mv" class="wrapper" tag="div">
      <!-- v-for 绑定 key 时不能使用 idx, 否则无法实现过渡效果 -->
      <div class="item" v-for="item of list" :key="item.id">
        {{ item.val }}
      </div>
    </TransitionGroup>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap; // 多行 flex 容器
  width: calc(27px * 9);
  .item {
    width: 25px;
    height: 25px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center; /** 水平居中 */
    align-items: center; /** 垂直居中 */
  }
}

.mv {
  transition: all 1s;
}
</style>
```

## [GASP](https://gsap.com/) 动画库

案例: GASP 状态过渡

```vue
<script setup lang="ts">
import gsap from "gsap";
const num = reactive({
  curVal: 0,
  tweenVal: 0,
});

watch(
  () => num.curVal, // getter
  (newVal, oldVal) => {
    console.log(newVal, oldVal);
    gsap.to(num, {
      duration: 1,
      tweenVal: newVal,
    });
  },
);
</script>

<template>
  <div>
    <el-input v-model="num.curVal" :step="20" type="number"></el-input>
    <div>
      {{ num.tweenVal.toFixed(0) }}
    </div>
  </div>
</template>
```
