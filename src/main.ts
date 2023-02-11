import router from '@/router/index';
import { key, store } from '@/store';

import { createApp } from 'vue';
import App from './App.vue';

// Style
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

createApp(App)
	.use(router)
	.use(store, key)
	.mount('#app');
