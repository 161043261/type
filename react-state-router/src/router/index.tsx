import { createBrowserRouter } from 'react-router'
import { Login } from '../pages/Login'
import { Article } from '../pages/Article'
import App from '../App'
import { Layout } from '../layout/Layout'
import { Board } from '../pages/Board'
import { About } from '../pages/About'
import { NotFound } from '../pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/layout',
    element: <Layout />,
    children: [
      {
        index: true, // 默认二级路由
        // 等价于设置 path: '',
        element: <About />,
      },
      {
        path: 'about', // /layout/about
        element: <About />,
      },
      {
        path: '/layout/board', // board
        element: <Board />,
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
    path: '*',
    element: <NotFound />,
  },
])
