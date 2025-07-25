import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:query?',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/meal/:id',
      name: 'mealDetail',
      component: () => import('../views/MealDetailView.vue'),
    },
    {
      path: '/favorites',
      name: 'favorite',
      component: () => import('../views/FavoriteView.vue')
    }
  ],
})

export default router
