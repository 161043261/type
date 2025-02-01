import LoginView from '@/views/LoginView.vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login', // 指定路由的名字
    component: LoginView, // 合并打包
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterView.vue'), // 异步导入的路由组件, 分开打包
  },
  {
    path: '/register/:id', // id: URL 路径参数, 必须传递
    name: 'RegisterWithId',
    component: () => import('@/views/RegisterView.vue'),
  },
  // 嵌套路由
  {
    path: '/root',
    component: () => import('@/views/RootView.vue'),
    children: [
      {
        path: '',
        name: 'RootLogin',
        component: () => import('@/views/LoginView.vue'),
      },
      {
        path: 'register',
        name: 'RootRegister',
        component: () => import('@/views/RegisterView.vue'),
      },
    ],
  },
  // 命名视图
  {
    path: '/container',
    component: () => import('@/views/ViewsContainer.vue'),
    // redirect: '/container/ab', //! 路由重定向

    // redirect: {
    //   path: '/container/ab',
    //   // name: 'AB',
    // },

    // http://localhost:5173/container?k=v
    // 重定向到 http://localhost:5173/container/ab?k=v
    redirect: (to) => {
      console.log('to:', to)
      // return '/container/ab'
      return {
        // path: '/container/ab',
        name: 'AB',
        query: to.query, // 默认
      }
    },

    // alias: '/views/container', //! 路由别名
    alias: ['/ViewsContainer', '/views/container'],
    // http://localhost:5173/ViewsContainer?k=v // 不区分大小写
    // http://localhost:5173/views/container?k=v
    // 都重定向到 http://localhost:5173/container/ab?k=v

    children: [
      {
        path: 'ab',
        name: 'AB',
        components: {
          default: () => import('@/views/NameA.vue'), // 视图名 default
          nameB: () => import('@/views/NameB.vue'), // 视图名 nameB
        },
      },
      {
        path: 'bc',
        name: 'BC',
        components: {
          nameB: () => import('@/views/NameB.vue'), // 视图名 nameB
          nameC: () => import('@/views/NameC.vue'), // 视图名 nameC
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes, // routes: routes
}) // options

export default router
