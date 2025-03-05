# zustand-router

## 路由导航

### 声明式导航

```tsx
import { Link } from "react-router";

export function Login() {
  return (
    <div>
      Login
      <Link to="/article">Link to article</Link>
    </div>
  );
}
```

### 编程式导航

```tsx
export function Login() {
  const navigate = useNavigate();
  return (
    <div>
      Login
      <button onClick={() => navigate('/article')}>Navigate to article</button>
    </div>
  )
}
```

## 路由导航传参

### searchParams 传参

```tsx
// src/page/Login.tsx
navigate('/article?name=whoami&age=23');

// src/page/Article.tsx
const [params] = useSearchParams();
const id = params.get('id');
```
