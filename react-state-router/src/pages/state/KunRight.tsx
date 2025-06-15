import { useKunStore, useKunStore2, useKunStore3, useKunStore4 } from '@/store/kun'

export function KunRight() {
  console.log('Update KunRight (vanilla)')
  //// const { name, hobbies } = useKunStore()
  const name = useKunStore((state) => state.name)
  const sing = useKunStore((state) => state.hobbies.sing)
  return (
    <div className="bg-pink-300">
      <div>name: {name}</div>
      <div>sing: {sing}</div>
    </div>
  )
}

export function KunRight2() {
  console.log('Update KunRight2 (immer)')
  //// const { name, hobbies } = useKunStore()
  const name = useKunStore2((state) => state.name)
  const sing = useKunStore2((state) => state.hobbies.sing)
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
