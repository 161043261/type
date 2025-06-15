/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'

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

//! vanilla
const useKunStore = create<IKun>((set) => ({
  name: 'Kun',
  age: 18,
  hobbies: {
    sing: '唱',
    dance: '跳',
    rap: 'rap',
    basketball: '篮球',
  },
  setSing: (newSing: string) =>
    set((state) => {
      return {
        // ...state,
        hobbies: {
          ...state.hobbies,
          sing: newSing,
        },
      }
    }),
  setDance: (newDance: string) =>
    set((state) => {
      return {
        // ...state, // optional
        hobbies: {
          ...state.hobbies,
          dance: newDance,
        },
      }
    }),
}))

//! immer + persist
const useKunStore2 = create<IKun>()(
  immer(
    persist(
      (set) => ({
        name: 'Kun',
        age: 18,
        hobbies: {
          sing: '唱',
          dance: '跳',
          rap: 'rap',
          basketball: '篮球',
        },
        setSing: (newSing: string) =>
          set((state) => {
            state.hobbies.sing = newSing
          }),
        setDance: (newDance: string) =>
          set((state) => {
            state.hobbies.dance = newDance
          }),
      }),
      {
        name: 'kunStore2', // localStorage 的 key 值
        storage: createJSONStorage(() => localStorage), // 默认 localStorage
        partialize: (state) => ({
          // 部分持久化
          name: state.name,
          age: state.age,
        }),
      },
    ),
  ),
)

const logger: any = (fn: any) => (set: any, get: any, storeApi: any) => {
  const loggedSet = (...args: any) => {
    console.log('Before setting', get(), storeApi)
    set(...args)
    console.log('After setting', get(), storeApi)
  }
  return fn(loggedSet, get, storeApi)
}

//! vanilla + logger
const useKunStore3 = create<IKun>()(
  logger((set: any) => ({
    name: 'Kun',
    age: 18,
    hobbies: {
      sing: '唱',
      dance: '跳',
      rap: 'rap',
      basketball: '篮球',
    },
    setSing: (newSing: string) =>
      set((state: any) => {
        return {
          // ...state, // optional
          hobbies: {
            ...state.hobbies,
            sing: newSing,
          },
        }
      }),
    setDance: (newDance: string) =>
      set((state: any) => {
        return {
          // ...state, // optional
          hobbies: {
            ...state.hobbies,
            dance: newDance,
          },
        }
      }),
  })),
)

//! immer + logger + devtools
const useKunStore4 = create<IKun>()(
  immer(
    logger(
      devtools(
        (set: any) => ({
          name: 'Kun',
          age: 18,
          hobbies: {
            sing: '唱',
            dance: '跳',
            rap: 'rap',
            basketball: '篮球',
          },
          setSing: (newSing: string) =>
            set((state: any) => {
              state.hobbies.sing = newSing
            }),
          setDance: (newDance: string) =>
            set((state: any) => {
              state.hobbies.dance = newDance
            }),
        }),
        { name: 'kunStore4' /** store */, enabled: true },
      ),
    ),
  ),
)

export { useKunStore, useKunStore2, useKunStore3, useKunStore4 }
