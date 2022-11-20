import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import WelcomePageVue from '@/pages/WelcomePage.vue';
import FeedPageVue from '@/pages/FeedPage.vue';
import LoginPageVue from '@/pages/LoginPage.vue';
import SignUpPageVue from '@/pages/SignUpPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: WelcomePageVue,
  },
  {
    path: '/posts',
    component: FeedPageVue,
  },
  {
    path: '/login',
    component: LoginPageVue,
  },
  {
    path: '/signup',
    component: SignUpPageVue,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
