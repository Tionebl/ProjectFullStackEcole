import { createRouter, createWebHistory } from 'vue-router';
import CharSelect from '@/views/CharSelect.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/char-select',
      name: 'char-select',
      component: CharSelect,
    },
  ],
});

export default router;
