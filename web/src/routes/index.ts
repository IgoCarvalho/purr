import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import WelcomePageVue from '@/pages/WelcomePage.vue';
import FeedPageVue from '@/pages/FeedPage.vue';
import LoginPageVue from '@/pages/LoginPage.vue';
import SignUpPageVue from '@/pages/SignUpPage.vue';
import NewPostPageVue from '@/pages/NewPostPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Welcome',
    component: WelcomePageVue,
  },
  {
    path: '/posts',
    name: 'Feed',
    component: FeedPageVue,
  },
  {
    path: '/new',
    name: 'NewPost',
    component: NewPostPageVue,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPageVue,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUpPageVue,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
