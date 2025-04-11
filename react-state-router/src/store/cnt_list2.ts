import { create } from 'zustand'
import { type CntStore, createCntSlice } from './cnt_slice'
import { createListSlice, type ListStore } from './list_slice'

export const useCntAndListStore2 = create<CntStore & ListStore>((...args) => {
  console.log(args.length)

  return {
    ...createCntSlice(...args),
    ...createListSlice(...args),
  }
})
