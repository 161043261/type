import { create } from 'zustand'
// import { immer } from 'zustand/middleware/immer'

interface IKun {
  name: string
  age: number
  hobbies: {
    sing: string
    dance: string
    rap: string
    basketball: string
  }
  setSing: (newSing: string) => void
  setDance: (newDance: string) => void
}

// const useKunStore = create<IKun>()(
//   immer((set) => ({
//     name: 'Kun',
//     age: 18,
//     hobbies: {
//       sing: '唱',
//       dance: '跳',
//       rap: 'rap',
//       basketball: '篮球',
//     },
//     setSing: (newSing: string) => set((state) => (state.hobbies.sing = newSing)),
//     setDance: (newDance: string) => set((state) => (state.hobbies.dance = newDance)),
//   })),
// )

const useKunStore = create<IKun>((set) => ({
  name: 'Kun',
  age: 18,
  hobbies: {
    sing: '唱',
    dance: '跳',
    rap: 'rap',
    basketball: '篮球',
  },
  setSing: (newSing: string) => set((state) => ({ ...state, sing: newSing })),
  setDance: (newDance: string) => set((state) => ({ ...state, dance: newDance })),
}))

export default useKunStore
