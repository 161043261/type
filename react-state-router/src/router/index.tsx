import { createBrowserRouter } from 'react-router'
import { Login } from '../pages/Login'
import Article from '../pages/Article'
import App from '../App'
import { Demo } from '../layout/Demo'
import { Home } from '../pages/Home.tsx'
import { NotFound } from '../pages/NotFound'
import Layout from '../layout'
import Loader from '@/pages/LoaderAction/Loader.tsx'
import Action from '@/pages/LoaderAction/Action.tsx'

const data = [
  { name: 'Microsoft', age: 1 },
  { name: 'Facebook', age: 2 },
]

async function fetchData(ms: number) {
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
  await sleep(ms)
  return data
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/demo',
    element: <Demo />,
    children: [
      // {
      //   index: true, // 默认二级路由, 等价于设置 path: ''
      //   element: <About />, // 等价于 Component: About
      // },
      {
        path: 'about', // 等价于 path: "/demo/about"
        // Component: About, // 等价于 element: <About />
        lazy: async () => {
          const startTime = Date.now()
          await new Promise((resolve) => {
            setTimeout(() => {
              console.log(Date.now() - startTime)
              resolve(null)
            }, 10000)
          })
          const About = await import('@/pages/About.tsx')
          return {
            Component: About.default,
          }
        },
      },
      {
        path: '/demo/home', // 等价于 path: "home"
        Component: Home, // 等价于 element: <Home />
      },
      {
        path: '/demo/loader',
        Component: Loader,
        loader: async () => {
          const data = await fetchData(5000)
          return {
            okOrErr: 'OK',
            data,
          }
        },
      },
      {
        path: '/demo/action',
        Component: Action,
        loader: async () => {
          const data = await fetchData(1000)
          throw { msg: 'NotFound' }
          return {
            okOrErr: 'OK',
            data,
          }
        },
        action: async ({ request }) => {
          const item = await request.json()
          data.push({ name: item.name, age: Number(item.age) })
          return { okOrErr: 'OK' }
        },
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
