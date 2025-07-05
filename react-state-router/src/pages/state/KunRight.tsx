import { useKunStore, useKunStore3, useKunStore4 } from '@/store/kun'
import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'

export function KunRight() {
  console.log('Update KunRight (vanilla)')
  const [isYoung, setIsYoung] = useState(true)

  // useEffect(() => {
  //   // state 的任何字段改变时, 都会触发回调函数
  //   useKunStore.subscribe((state) => {
  //     console.log(state)
  //     setIsYoung(state.age <= 22)
  //   })
  // }, [])

  // 组件内部订阅
  useEffect(() => {
    // 只有 state 的 age 字段值改变时, 才会触发回调函数
    const unsubscribe /** 取消订阅 */ = useKunStore.subscribe(
      (state) => state.age,
      (age, preAge) => {
        console.log(age, '<-', preAge)
        setIsYoung(age <= 22)
      },
      {
        // 可选配置
        equalityFn: (a, b) => a === b,
        fireImmediately: true, // 是否立即执行, 默认 false
      },
    )
    return unsubscribe // useEffect 返回一个清理函数
  }, [])

  //// const { name, hobbies } = useKunStore()
  const { name, sing } = useKunStore(
    useShallow((state) => ({
      name: state.name,
      sing: state.hobbies.sing,
    })),
  )

  return (
    <div className="bg-pink-300">
      <div>name: {name}</div>
      <div>sing: {sing}</div>
      <div>{isYoung ? 'youngKun' : 'oldKun'}</div>
    </div>
  )
}

export function KunRight2() {
  console.log('Update KunRight2 (immer)')
  //// const { name, hobbies } = useKunStore()
  const { name, sing } = useKunStore(
    useShallow((state) => ({
      name: state.name,
      sing: state.hobbies.sing,
    })),
  )

  return (
    <div className="bg-pink-300">
      <div>name: {name}</div>
      <div>sing: {sing}</div>
    </div>
  )
}

export function KunRight3() {
  console.log('Update KunRight3 (logger + vanilla)')
  //// const { name, hobbies } = useKunStore()
  const name = useKunStore3((state) => state.name)
  const sing = useKunStore3((state) => state.hobbies.sing)
  return (
    <div className="bg-pink-300">
      <div>name: {name}</div>
      <div>sing: {sing}</div>
    </div>
  )
}

export function KunRight4() {
  console.log('Update KunRight4 (logger + immer)')
  //// const { name, hobbies } = useKunStore()
  const name = useKunStore4((state) => state.name)
  const sing = useKunStore4((state) => state.hobbies.sing)
  return (
    <div className="bg-pink-300">
      <div>name: {name}</div>
      <div>sing: {sing}</div>
    </div>
  )
}
