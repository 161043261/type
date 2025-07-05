import { StateCreator } from 'zustand'

export interface CntStore {
  cnt: number
  addCnt: () => void
  resetCnt: () => void
}

export const createCntSlice: StateCreator<CntStore> = (set) => {
  return {
    cnt: 0,

    addCnt: () => {
      set((state: CntStore) => ({ cnt: state.cnt + 1 }))
    },

    resetCnt: () => {
      set({ cnt: 0 })
    },
  }
}
