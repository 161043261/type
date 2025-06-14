import { useSearchParams, useLocation } from 'react-router'

export default function About() {
  const [searchParams, setSearchParams] = useSearchParams()
  const company = searchParams.get('company')
  const project = searchParams.get('project')
  console.log(company, project)

  const location = useLocation()
  // 如果 searchParams 中有中文, 则需要对 location.search 手动解码
  console.log(location)
  console.log(location.search)
  console.log(location.state)
  return (
    <div className="h-[200px] w-[200px] bg-amber-300">
      About 二级路由, 默认二级路由
      <button
        onClick={() =>
          setSearchParams((params) => {
            params.set('company', 'hoyoverse')
            params.set('project', 'genshin')
            return params
          })
        }
      >
        setSearchParams
      </button>
    </div>
  )
}
