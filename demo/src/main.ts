import 'vue3-notify/style.css';
import 'virtual:windi.css';

import { createApp } from 'vue';
import { VueNotificationPlugin } from 'vue3-notify';

import App from './app.vue';

const app = createApp(App);
app.use(VueNotificationPlugin);
app.mount('#app');
