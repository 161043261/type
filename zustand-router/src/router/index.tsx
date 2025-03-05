import { createBrowserRouter } from 'react-router'
import { Login } from '../page/Login'
import { Article } from '../article/Article'
import App from '../App'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/article',
    element: <Article />,
  },
])
