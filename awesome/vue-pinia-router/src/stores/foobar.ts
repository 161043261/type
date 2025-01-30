import { defineStore } from 'pinia'
import { ref } from 'vue'

// Pinia 选项式
export const useFooStore = defineStore('foo', {
  state: () => ({
    age: 1,
    name: 'foo',
  }),
  actions: {
    changeAge: function (delta: number) {
      this.age += delta
    },
  },
})

// Pinia 组合式
export const useBarStore = defineStore('bar', () => {
  const age = ref(2)
  const name = ref('bar')
  const changeAge = function (delta: number) {
    age.value += delta
  }
  const $reset = () => {
    ;[age.value, name.value] = [2, 'bar']
  }
  return {
    age,
    name,
    changeAge,
    $reset,
  }
})
