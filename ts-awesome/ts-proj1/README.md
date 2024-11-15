# ts-proj1

TS 蓝: #3178C6

```shell
npm create vue@latest
npm install -g ts-node @types/node
npm install sass
```

--open 自动打开默认浏览器

```json
{
  "scripts": {
    "dev": "vite --open"
  }
}
```

代码片段

```json
{
  "Vue3 snippet": {
    "prefix": "v3",
    "body": [
      "<script setup lang=\"ts\">",
      "</script>",
      "",
      "<template>",
      "</template>",
      "",
      "<style lang=\"css\" scoped>",
      "</style>"
    ],
    "description": "Vue3 snippet"
  }
}
```

> 父组件到子组件的通信: 自定义属性

父组件使用 v-bind: 向子组件发送数据, [父组件](./src/views/home/home.vue)

```vue
<!--! 父组件使用 v-bind: 向子组件发送数据 -->
<div class="cards">
  <Card
    class="item"
    v-for="(item, idx) in content"
    :key="item.id + '-' + idx"
    v-bind:hosp="item"
  />
</div>
```

子组件使用 defineProps 从父组件接收数据, [子组件](./src/views/home/card.vue)

```vue
<script lang="ts" setup>
//! 子组件使用 defineProps 从父组件接收数据
defineProps(['hosp'])
</script>
```

> 子组件到父组件的通信: 自定义事件

[子组件](./src/views/home/hospital_level.vue)

```vue
<script lang="ts" setup>
function changeLevelId(id: string) {
  flag.id = id
  // 子组件使用自定义事件, 向父组件发送数据
  emitFunc('send-level-id' /* 事件名 */, id /* 参数列表 */)
}

// 自定义事件 send-level-id
const emitFunc = defineEmits(['send-level-id']) // 事件名列表
</script>

<template>
  <!-- 点击触发自定义事件 -->
  <li
    :class="{ highlight: flag == level.id }"
    v-for="level in levels"
    :key="level.id"
    @click="
      changeLevelId(level.id)
      /* ; emitFunc('send-level-id', level.id) */
    "
  ></li>
</template>
```

[父组件](./src/views/home/home.vue)

```vue
<script lang="ts" setup>
// 父组件使用自定义事件, 从子组件接收数据
function getLevelId(args: string) {
  console.log('子组件发送的数据:', args)
  level.id = args
  getHospArr()
}
</script>

<template>
  <!-- 自定义事件 send-level-id -->
  <HospitalLevel @send-level="getLevelId" />
</template>
```

条件渲染: v-if 和 v-else

```vue
<template>
  <div class="cards" v-if="content.length > 0"></div>
  <el-empty v-else description="暂无数据"></el-empty>
</template>
```
