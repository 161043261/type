import { useNavigate } from 'react-router'

//! 声明式导航
// export function Login() {
//   return (
//     <div>
//       Login
//       <Link to="/article">link to article</Link>
//     </div>
//   );
// }

//! 编程式导航
export function Login() {
  const navigate = useNavigate()
  return (
    <div>
      <h1>Login</h1>
      <div className="flex flex-col gap-1">
        <button className="border-1" type="button" onClick={() => navigate('/article')}>
          Navigate to article
        </button>
        <button
          className="border-1"
          type="button"
          onClick={() => navigate('/article?name=whoami&age=23')}
        >
          SearchParams
        </button>
        <button className="border-1" type="button" onClick={() => navigate('/article/whoami/23')}>
          Params
        </button>
      </div>
    </div>
  )
}
