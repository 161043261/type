import { defineStore } from 'pinia'
import { StoreNames } from './store_names'
export const useFooStore /** 命名规范 useXxxStore */ = defineStore(
  StoreNames.FOO, // storeId
  {
    state: () => ({
      age: 23,
      name: 'yukino',
    }),
    // 类似计算属性, 也会缓存计算结果
    getters: {},

    actions: {
      muteAge(delta: number) {
        // 不能写箭头函数, 否则没有 this
        this.age += delta
      },
    },
  }, // options
)
