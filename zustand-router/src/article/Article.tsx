import { useSearchParams } from 'react-router'

export function Article() {
  const [urlSearchParams /** , setURLSearchParams */] = useSearchParams()
  return (
    <>
      <div>Article</div>
      <div>
        URLSearchParams: {urlSearchParams.get('name') ?? 'defaultName'},{' '}
        {urlSearchParams.get('age') ?? 'defaultAge'}
      </div>
    </>
  )
}
