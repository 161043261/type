import { createWebHistory, createRouter } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      // 自定义指令: 拖拽案例
      path: '/customDirective3',
      name: 'CustomDirective3',
      component: () => import('@/views/CustomDirective3.vue'),
    },
    {
      // 自定义指令: 图片懒加载
      path: '/customDirective4',
      name: 'CustomDirective4',
      component: () => import('@/views/CustomDirective4.vue'),
    },
    {
      // 自定义指令和自定义 hook 综合案例
      path: '/resizeDemo',
      name: 'ResizeDemo',
      component: () => import('@/views/ResizeDemo.vue'),
    },
    {
      // process.nextTick()
      path: '/nextTick',
      name: 'NextTick',
      component: () => import('@/views/NextTick.vue'),
    },
    {
      // process.nextTick()
      path: '/nextTick2',
      name: 'NextTick2',
      component: () => import('@/views/NextTick2.vue'),
    },
    {
      // 圣杯布局
      path: '/threeColumn',
      name: 'ThreeColumn',
      component: () => import('@/views/ThreeColumnLayout.vue'),
    },
    {
      // Vue 函数式编程
      path: '/functionalDemo',
      name: 'FunctionalDemo',
      component: () => import('@/views/FunctionalDemo.vue'),
    },
    {
      path: '/virtualList',
      name: 'VirtualList',
      component: () => import('@/views/VirtualList.vue'),
    },
  ],
})
