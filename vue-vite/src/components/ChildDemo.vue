<script lang="ts" setup>
///////////
// 父传子 //
///////////

// // 不能指定类型, 默认值
// const props = defineProps(['str', 'refStr', 'reactiveArr'])

//#region
// // JS 常用, 可以指定类型, 默认值
// const props = defineProps({
//   str: {
//     type: String,
//     default: 'Default str',
//   },
//   refStr: {
//     type: String,
//     default: 'Default refStr',
//   },
//   reactiveArr: {
//     type: Array<number>, // Array
//     default: () => [1, 2, 3], // 引用类型必须转换为箭头函数
//   },
// })
//#endregion

//#region
// // 不能指定默认值
// const props = defineProps<{
//   str?: string
//   refStr?: string
//   reactiveArr?: number[]
// }>()
//#endregion

// TS 常用, 可以指定类型, 默认值
const props = withDefaults(
  defineProps<{
    str?: string
    refStr?: string
    reactiveArr?: number[]
  }>(),
  {
    str: 'Default str',
    refStr: 'Default refStr',
    reactiveArr: () => [1, 2, 3], // 引用类型必须转换为箭头函数
  },
)
console.log('[ChildDemo] props:', props.str, props.refStr, props.reactiveArr)

///////////
// 子传父 //
///////////

// onBlur 组件失去焦点时触发
// onChange 组件的内容改变时触发
// onClick 点击组件时触发
// onKeydown, onKeyPress, onKeyup 前提: 组件有焦点时

const emit = defineEmits(['evName', 'evName2'])

// const emit = defineEmits<{
//   // 事件名 evName, evName2 会被自动转换为 ev-name, ev-name2
//   (e: 'evName', arg: Event): void, // 范型中必须使用 : 不能使用 =>
//   (e: 'evName2', arg: string, arg2: string): void
// }>()

// const emit = defineEmits<{
//   evName: [arg: Event],
//   evName2: [arg: string, arg2: string]
// }>()

function txToParent(ev: Event) {
  emit('evName', ev)
}
function txToParent2() {
  emit('evName2', 'foo', 'bar')
}
</script>

<template>
  <div>
    <ul>
      <!-- template 中, 使用 props.propName 或直接使用 propName 都可以 -->
      <li>str: {{ props.str }}</li>
      <li>refStr: {{ refStr }}</li>
      <li>reactiveArr: {{ reactiveArr }}</li>
    </ul>
    <button @click="(ev) => txToParent(ev)">子传父</button>
    <button @click="txToParent2">子传父2</button>
  </div>
</template>

<style lang="css" scoped></style>
