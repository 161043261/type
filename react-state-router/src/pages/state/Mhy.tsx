import useMhyStore from '@/store/mhy'

function Up() {
  const { updateFirst } = useMhyStore()
  return (
    <div>
      <button onClick={updateFirst}>updateFirst</button>
    </div>
  )
}

export default function Mhy() {
  const { games } = useMhyStore()
  return (
    <>
      <div>
        <Up />
      </div>
      <div className="bg-blue-100">
        <div>{games.first}</div>
        <div>{games.second}</div>
        <div>{games.third}</div>
      </div>
    </>
  )
}
