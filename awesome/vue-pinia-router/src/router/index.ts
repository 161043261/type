import LoginView from '@/views/LoginView.vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    transition: string
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login', // 指定路由的名字
    component: LoginView, // 合并打包
    // 路由元信息
    meta: {
      title: 'Pinia 状态管理库',
      transition: 'animate__bounceIn',
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterView.vue'), // 异步导入的路由组件, 分开打包
  },
  {
    path: '/register/:id/:name?/:price?', // id: URL 路径参数
    // :id 必传参数, :name? :price? 可选参数
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
  {
    path: '/login',
    component: () => import('@/views/LoginDemo.vue'),
  },
  {
    path: '/index',
    component: () => import('@/views/IndexDemo.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),

  // 滚动行为, 仅 history.pushState 时可用
  scrollBehavior: (to, from, savedPosition) => {
    // 滚动到原位置
    if (savedPosition) {
      console.log('savedPosition:', savedPosition)
      return savedPosition
    }
    // 滚动到锚点
    if (to.hash) {
      console.log('to.hash:', to.hash)
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    // 滚动到顶部
    return {
      top: 0,
    }
    // 延迟滚动
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve({
    //       left: 0,
    //       top: 0
    //     })
    //  }, 1000)
    // })
  },

  routes, // routes: routes
}) // options

export default router
