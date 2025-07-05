import { create } from 'zustand'

interface IPriceStore {
  price: number
  stock: number
  incPrice: () => void
  decPrice: () => void
  resetPrice: () => void
  getPrice: () => number
}

const usePriceStore = create<IPriceStore>((set, get) => {
  return {
    price: 0,
    stock: 0,
    incPrice: () => set((state) => ({ price: state.price + 1 })),
    decPrice: () => set((state) => ({ price: state.price - 1 })),
    resetPrice: () => set({ price: 0 }),
    getPrice: () => get().price,
  }
})

export default usePriceStore
