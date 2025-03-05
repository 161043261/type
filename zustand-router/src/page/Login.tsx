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
      Login
      <button onClick={() => navigate('/article')}>Navigate to article</button>
      <button onClick={() => navigate('/article?name=whoami&age=23')}>searchParams</button>
    </div>
  )
}
