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
]

const router = createRouter({
  history: createWebHistory(),
  routes, // routes: routes
}) // options

export default router
