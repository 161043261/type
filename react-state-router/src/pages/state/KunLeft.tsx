import { useKunStore, useKunStore2, useKunStore3, useKunStore4 } from '@/store/kun'

export function KunLeft() {
  console.log('Update KunLeft (vanilla)')
  const { name, age, hobbies, setSing, setDance } = useKunStore()
  return (
    <div className="bg-blue-300">
      <div>name: {name}</div>
      <div>age: {age}</div>
      <ul>
        {Object.values(hobbies).map((val, idx) => (
          <li key={idx}>{val}</li>
        ))}
      </ul>
      <div className="flex gap-5">
        <button onClick={() => setSing(hobbies.sing + '!')}>setSing</button>
        <button onClick={() => setDance(hobbies.dance + '!')}>setDance</button>
      </div>
    </div>
  )
}

export function KunLeft2() {
  console.log('Update KunLeft2 (immer)')
  const { name, age, hobbies, setSing, setDance } = useKunStore2()
  return (
    <div className="bg-blue-300">
      <div>name: {name}</div>
      <div>age: {age}</div>
      <ul>
        {Object.values(hobbies).map((val, idx) => (
          <li key={idx}>{val}</li>
        ))}
      </ul>
      <div className="flex gap-5">
        <button onClick={() => setSing(hobbies.sing + '!')}>setSing</button>
        <button onClick={() => setDance(hobbies.dance + '!')}>setDance</button>
      </div>
    </div>
  )
}

export function KunLeft3() {
  console.log('Update KunLeft3 (logger + vanilla)')
  const { name, age, hobbies, setSing, setDance } = useKunStore3()
  return (
    <div className="bg-blue-300">
      <div>name: {name}</div>
      <div>age: {age}</div>
      <ul>
        {Object.values(hobbies).map((val, idx) => (
          <li key={idx}>{val}</li>
        ))}
      </ul>
      <div className="flex gap-5">
        <button onClick={() => setSing(hobbies.sing + '!')}>setSing</button>
        <button onClick={() => setDance(hobbies.dance + '!')}>setDance</button>
      </div>
    </div>
  )
}

export function KunLeft4() {
  console.log('Update KunLeft4 (logger + immer)')
  const { name, age, hobbies, setSing, setDance } = useKunStore4()
  return (
    <div className="bg-blue-300">
      <div>name: {name}</div>
      <div>age: {age}</div>
      <ul>
        {Object.values(hobbies).map((val, idx) => (
          <li key={idx}>{val}</li>
        ))}
      </ul>
      <div className="flex gap-5">
        <button onClick={() => setSing(hobbies.sing + '!')}>setSing</button>
        <button onClick={() => setDance(hobbies.dance + '!')}>setDance</button>
      </div>
    </div>
  )
}
