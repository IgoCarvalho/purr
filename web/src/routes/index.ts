import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import WelcomePageVue from '@/pages/WelcomePage.vue';
import FeedPageVue from '@/pages/FeedPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: WelcomePageVue,
  },
  {
    path: '/posts',
    component: FeedPageVue,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
