// correspond to ../components/pinia/Count.vue
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCountStore = defineStore('count', {
  // action functions
  actions: {
    addSum(delta: number) {
      this.sum += delta
    }
  },
  state: () => {
    return { sum: 0, n: 0 }
  },
  // state() { return { sum: 0, n: 0 } },
  getters: {
    big(state) {
      return 10 * state.sum
    },
    bigger(): number {
      return 100 * this.sum
    },
    biggest: (state) => {
      return 1000 * state.sum
    }
  }
})

export const _useCountStore = defineStore('count', () => {
  // state
  const n = ref(0)
  const arr = ref([1, 2, 3])
  // functions, getters
  function addSum(delta: number) {
    n.value += delta
  }
  function bigger(): number {
    return 100 * n.value
  }

  // computed property
  const sum = computed(() => {
    return arr.value.reduce((pre: number, cur: number) => pre + cur, 0)
  })
  return { n, addSum, bigger, sum }
})
