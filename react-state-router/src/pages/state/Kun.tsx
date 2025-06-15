import useKunStore from '@/store/kun'

function Left() {
  console.log('Update left')
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
        <button onClick={() => setSing((hobbies.sing += '!'))}>setSing</button>
        <button onClick={() => setDance((hobbies.dance += '!'))}>setDance</button>
      </div>
    </div>
  )
}

function Right() {
  console.log('Update right')
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

export default function Kun() {
  console.log('Kun')
  return (
    <div className="flex gap-10">
      <Left />
      <Right />
    </div>
  )
}
