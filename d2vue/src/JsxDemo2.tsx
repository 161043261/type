import { defineComponent, ref, type VNode } from 'vue'
import { ElButton, ElInput } from 'element-plus'

// 组合式
// 支持 v-show, 不支持 v-if, v-for
/**
 * Vue                  JSX
 * v-bind 或 :          type={item.type}
 * v-on 或 @            onEventType={ callback }
 * v-if                 if...else 或三元运算符
 * v-show               if...else 或三元运算符, vueJsx 也支持
 * v-for                数组的 map 方法
 * props, emit, slots   setup(props, { emit, slots }) {}
 * v-model              v-bind + 事件回调, vueJsx 也支持
 */

// emit 派发事件
// v-on 或 @, onEventType 监听事件

interface IProps {
  propName: string
}

export default defineComponent({
  props: ['propName'],
  emits: ['eventType'],
  setup(props: IProps, { emit }) {
    const age = ref(22)
    const addAge = () => age.value++
    const isShow = ref(false)
    const data: {
      type: 'default' | 'success' | 'info' | 'primary' | 'danger' | 'warning'
    }[] = [
      { type: 'default' },
      { type: 'success' },
      { type: 'info' },
      { type: 'primary' },
      { type: 'danger' },
      { type: 'warning' },
    ]

    const defaultSlot = {
      default: () => <div>默认插槽</div>,
      foo: () => <div>具名插槽</div>,
    }

    const inputVal = ref('')

    const setInputVal = (newVal: string) => {
      inputVal.value = newVal
    }

    return () => (
      <main>
        <div>{age.value}</div>
        <ElButton onClick={addAge}>addAge</ElButton>

        <div style={{ display: 'flex' }} /** inline stylesheet */>
          <ElButton onClick={() => (isShow.value = !isShow.value)}>显示/隐藏</ElButton>
          <div v-show={isShow.value}>讨厌红楼梦</div>
        </div>

        <div>isShow: {isShow.value ? <div>true</div> : <div>false</div>}</div>
        {data.map((item) => (
          <ElButton
            type={item.type}
            /** v-bind */ onClick={() => emit('eventType', item.type) /** 派发 eventType 事件 */}
          >
            {item.type}
          </ElButton>
        ))}

        <div>props: {props.propName}</div>

        <RenderFunction v-slots={defaultSlot}></RenderFunction>

        <div>inputVal: {inputVal.value}</div>
        <ElInput modelValue={inputVal.value} onInput={setInputVal}></ElInput>
        <ElInput v-model={inputVal.value}></ElInput>
      </main>
    )
  },
})

const RenderFunction = (
  _props: Record<string, unknown>,
  {
    slots,
  }: {
    slots: { default?: () => VNode[]; foo?: () => VNode[] }
  },
): VNode => (
  <>
    <div>{slots.default ? slots.default() : <div>defaultSlot</div>}</div>
    <div>{slots.foo?.()}</div>
  </>
)
