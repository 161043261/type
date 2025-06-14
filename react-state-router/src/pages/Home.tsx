import { NavLink, useNavigate } from 'react-router'

export function Home() {
  const navigate = useNavigate()
  return (
    <div className="flex h-[200px] w-[200px] flex-col gap-5 bg-blue-300">
      Home
      <button
        onClick={() =>
          navigate('/demo/about?company=米哈游&project=原神', {
            state: {
              project: '崩坏星穹铁道',
              version: 3.2,
            },
          })
        }
      >
        About
      </button>
      <NavLink
        to="/demo/about?company=米哈游&project=原神"
        state={{
          project: '崩坏星穹铁道',
          version: 3.2,
        }}
        viewTransition
        style={({ isActive, isPending, isTransitioning }) => {
          return {
            fontSize: '10rem',
            color: (() => {
              if (isActive) return 'lightpink'
              if (isPending) return 'lightgreen'
              if (isTransitioning) return 'lightblue'
              return 'black'
            })(),
          }
        }}
      >
        About2
      </NavLink>
    </div>
  )
}
