import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/waterfall',
      component: () => import('../views/WaterfallParent.vue'),
    },
  ],
})

export default router
