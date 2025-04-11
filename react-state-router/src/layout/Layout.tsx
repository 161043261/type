import { Link, Outlet } from 'react-router'

export function Layout() {
  return (
    <div>
      Layout 一级路由
      {/* 等价于 to="about" */}
      <Link to="/layout/about">About</Link>
      {/* 等价于 to="/layout/board" */}
      <Link to="board">Board</Link>
      {/* Outlet: 渲染父路由的匹配子路由, 如果没有匹配的子路由, 则不渲染
      类比 Vue 的 <RouterView> */}
      <Outlet />
    </div>
  )
}
