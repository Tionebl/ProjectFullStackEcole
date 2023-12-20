import { createRouter, createWebHistory } from 'vue-router';
import CharSelect from '../views/CharSelect.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/char-select',
      name: 'char-select',
      component: CharSelect,
    },
    // Autres routes ici si nécessaire
  ],
});

export default router;
