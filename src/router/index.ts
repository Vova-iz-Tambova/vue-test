import { createRouter, createWebHistory } from 'vue-router'
import Catalog from '@/components/catalog/Catalog.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Catalog
    },
  ]
})

export default router
