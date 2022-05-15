import 'virtual:windi.css';

import { createApp } from 'vue';
import VueNotify from 'vue3-notify';

import App from './app.vue';

const app = createApp(App);
app.use(VueNotify);
app.mount('#app');
