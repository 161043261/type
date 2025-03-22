import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/waterfall',
      component: () => import('../views/WaterfallParent.vue'),
    },
    {
      path: '/review',
      component: () => import('../views/review2/ReviewIndex.vue'),
    },
  ],
})

export default router
