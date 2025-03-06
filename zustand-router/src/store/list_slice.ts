import { StateCreator } from 'zustand'

export interface ListStore {
  nameList: { id: number; cnName: string }[]
  fetchList: () => Promise<void>
}

export const createListSlice: StateCreator<ListStore> = (set) => {
  return {
    nameList: [],

    fetchList: async () => {
      const res = await fetch('/api/list').then((res) => res.json())
      const { code, message, data } = res
      console.log(code, message)

      // 修改 zustand 状态必须调用 set 方法
      set({ nameList: data.list })
    },
  }
}
