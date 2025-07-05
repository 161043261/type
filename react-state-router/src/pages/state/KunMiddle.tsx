import { useKunStore, useKunStore2, useKunStore3, useKunStore4 } from '@/store/kun'
import { useShallow } from 'zustand/react/shallow'

export function KunMiddle() {
  console.log('Update KunMiddle (vanilla)')
  const { name, sing } = useKunStore(
    useShallow((state) => ({
      name: state.name,
      sing: state.hobbies.sing,
    })),
  )
  return (
    <div className="bg-green-300">
      <div>name: {name}</div>
      <div>sing: {sing}</div>
    </div>
  )
}

export function KunMiddle2() {
  console.log('Update KunMiddle2 (immer)')
  const { name, sing } = useKunStore2(
    useShallow((state) => ({
      name: state.name,
      sing: state.hobbies.sing,
    })),
  )

  const clearStorage = () => useKunStore2.persist.clearStorage()
  return (
    <div className="bg-green-300">
      <div>name: {name}</div>
      <div>sing: {sing}</div>
      <button onClick={() => clearStorage()}></button>
    </div>
  )
}

export function KunMiddle3() {
  console.log('Update KunMiddle3 (logger + vanilla)')
  const { name, sing } = useKunStore3(
    useShallow((state) => ({
      name: state.name,
      sing: state.hobbies.sing,
    })),
  )
  return (
    <div className="bg-green-300">
      <div>name: {name}</div>
      <div>sing: {sing}</div>
    </div>
  )
}

export function KunMiddle4() {
  console.log('Update KunMiddle4 (logger + immer)')
  const { name, sing } = useKunStore4(
    useShallow((state) => ({
      name: state.name,
      sing: state.hobbies.sing,
    })),
  )
  return (
    <div className="bg-green-300">
      <div>name: {name}</div>
      <div>sing: {sing}</div>
    </div>
  )
}
