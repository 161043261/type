import LoginView from '@/views/LoginView.vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: LoginView, // 合并打包
  },
  {
    path: '/reg',
    component: () => import('@/views/RegisterView.vue'), // 异步导入的路由组件, 分开打包
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
}) // options

export default router
