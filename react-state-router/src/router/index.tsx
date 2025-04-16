import { createBrowserRouter } from 'react-router'
import { Login } from '../pages/Login'
import { Article } from '../pages/Article'
import App from '../App'
import { Layout as Demo } from '../layout/Demo'
import { Board } from '../pages/Board'
import { About } from '../pages/About'
import { NotFound } from '../pages/NotFound'
import Layout from '../layout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/demo',
    element: <Demo />,
    children: [
      {
        index: true, // 默认二级路由, 等价于设置 path: ''
        element: <About />, // 等价于 Component: About
      },
      {
        path: 'about', // 等价于 path: "/demo/about"
        Component: About, // 等价于 element: <About />
      },
      {
        path: '/demo/board', // 等价于 path: "board"
        Component: Board, // 等价于 element: <Board />
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/article',
    element: <Article />,
  },
  {
    path: '/article/:name/:age',
    element: <Article />,
  },
  {
    path: '/antd',
    Component: Layout,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
