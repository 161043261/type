# zustand-router

## 路由导航

### 声明式导航

```tsx
import { Link } from 'react-router'

export function Login() {
  return (
    <div>
      Login
      <Link to="/article">Link to article</Link>
    </div>
  )
}
```

### 编程式导航 (hook: useNavigate)

```tsx
export function Login() {
  const navigate = useNavigate()
  return (
    <div>
      Login
      <button onClick={() => navigate('/article')}>Navigate to article</button>
    </div>
  )
}
```

## 路由导航传参

### SearchParams 传参 (hook: useSearchParams)

```tsx
// src/page/Login.tsx
navigate('/article?name=whoami&age=23')

// src/page/Article.tsx
const [params, setParams] = useSearchParams()
const name = params.get('name')
const age = params.get('age')
```

### Params 传参 (hook: useParams)

```tsx
// src/page/Login.tsx
navigate('/article?name=whoami&age=23')

// src/page/Article.tsx
const params = useParams() // params 只读
console.log(params.name, params.age);
```
