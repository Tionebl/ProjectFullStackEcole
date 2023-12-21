import { createRouter, createWebHistory } from 'vue-router'
import CharSelect from '../views/CharSelect.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CharSelect
    },
  ]
})

export default router
