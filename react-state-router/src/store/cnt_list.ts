import { create } from 'zustand'

interface Store {
  cnt: number
  addCnt: () => void
  resetCnt: () => void
  nameList: { id: number; cnName: string }[]
  fetchList: () => Promise<void>
}

export const useCntAndListStore = create<Store>((set) => {
  return {
    cnt: 0,

    addCnt: () => {
      set((state: Store) => ({ cnt: state.cnt + 1 }))
    },

    resetCnt: () => {
      set({ cnt: 0 })
    },

    nameList: [],

    fetchList: async () => {
      const res = await fetch('/api/list').then((res) => res.json())
      const { code, message, data } = res
      console.log(code, message)

      // 修改 zustand 状态必须调用 set 方法
      set({ nameList: data.list })
    },
  }
})
