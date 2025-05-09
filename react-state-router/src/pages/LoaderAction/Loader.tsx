import { useLoaderData } from 'react-router'

export default function Loader() {
  const { data, okOrErr } = useLoaderData<{
    data: { name: string; age: string }[]
    okOrErr: string
  }>()
  return (
    <main>
      <div>okOrErr: {okOrErr}</div>
      <div>
        {data.map((item, idx) => (
          <div key={idx}>
            name: {item.name}, age: {item.age}
          </div>
        ))}
      </div>
    </main>
  )
}
