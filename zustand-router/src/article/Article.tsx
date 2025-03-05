import { useParams, useSearchParams } from 'react-router'

export function Article() {
  const [urlSearchParams /** , setURLSearchParams */] = useSearchParams()
  const params = useParams()
  return (
    <>
      <div>Article</div>
      useSearchParams
      <ul>
        <li>name: {urlSearchParams.get('name') ?? 'defaultName'}</li>
        <li>age: {urlSearchParams.get('age') ?? 'defaultAge'}</li>
      </ul>
      useParams
      <ul>
        <li>name: {params.name ?? 'defaultName'}</li>
        <li>age: {params.age ?? 'defaultAge'}</li>
      </ul>
    </>
  )
}
