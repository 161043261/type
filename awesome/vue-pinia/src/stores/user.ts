import { defineStore } from 'pinia'
import { computed, reactive, ref, type ComputedRef, type Reactive, type Ref } from 'vue'

function fetchDefault(): Promise<{ name: string; age: number }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'default',
        age: 18,
      })
    }, 3000)
  })
}

export const useUserStore /** 命名规范 useXxxStore */ = defineStore(
  'user', // storeId
  {
    state: () => ({
      name: '$reset',
      age: 1,
    }),
    // getters 类似计算属性, 也会缓存计算结果
    getters: {
      newName(): string {
        return `${this.name}__new`
      },
    },
    // actions 中可以写同步/异步方法
    actions: {
      setDefaultSync() {
        ;({ name: this.name, age: this.age } = { name: 'default', age: 18 })
      },
      async setDefault() {
        ;({ name: this.name, age: this.age } = await fetchDefault())
      },
      // 不能写箭头函数, 否则没有 this
      changeAge: function (delta: number) {
        this.age += delta
      },
    },
  }, // options
)

export const useUserStore2 = defineStore('user2', () => {
  // ********** state **********
  const name: Ref<string> = ref('$reset')
  const age: Ref<number> = ref(1)
  const foobar: Reactive<{ foo: string }> = reactive({ foo: 'bar' })

  // ********** getters (使用计算属性) **********
  const newName: ComputedRef<string> = computed(() => `${name.value}__new`)

  // ********** actions **********
  const setDefaultSync: () => void = () => {
    // 对于 reactive 创建的响应式变量, 一定不能改变该变量的地址, 否则会失去响应式
    foobar.foo = 'bar'
    ;({ name: name.value, age: age.value } = { name: 'default', age: 18 })
  }

  const changeAge: (delta: number) => void = (delta: number) => {
    age.value += delta
  }

  const $reset: () => void = () => {
    ;[name.value, age.value, foobar.foo] = ['$reset', 1, 'bar']
  }
  // 一定要 return, 类比组件的 setup
  return {
    name, // Ref<string>
    age, // Ref<number>
    foobar, // Reactive<{ foo: string }>
    newName, // ComputedRef<string>
    setDefaultSync, // () => void
    changeAge, // (delta: number) => void
    $reset,
  }
}) // storeSetup 函数
