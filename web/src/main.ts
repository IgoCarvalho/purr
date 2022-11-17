import { createApp } from 'vue';
import App from './App.vue';

import { router } from './routes';
import { pinia } from './stores';

import './styles/main.css';

const vueApp = createApp(App);

vueApp.use(pinia);
vueApp.use(router);

vueApp.mount('#app');
