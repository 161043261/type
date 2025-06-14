import { Link, Outlet, useNavigation } from 'react-router'
import { Alert, Spin } from 'antd'

export function Demo() {
  const navigation = useNavigation()
  console.log(navigation.state)

  const isLoading = navigation.state === 'loading'
  return (
    <div className="flex flex-col gap-5">
      Layout 一级路由
      {/* 等价于 to="demo" */}
      <Link to="/demo/about">About</Link>
      {/* 等价于 to="/demo/home" */}
      <Link to="home">Home</Link>
      <Link to="/demo/loader">Loader</Link>
      <Link to="/demo/action">Action</Link>
      {/* Outlet: 渲染父路由的匹配子路由, 如果没有匹配的子路由, 则不渲染
      类比 Vue 的 <RouterView> */}
      {isLoading ? (
        <Spin size="large" tip="loading...">
          <Alert description="loading2... " message="loading3..." type="info" />
        </Spin>
      ) : (
        <Outlet />
      )}
      {/*<Outlet />*/}
    </div>
  )
}
