import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import WelcomePageVue from '@/pages/WelcomePage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: WelcomePageVue,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
