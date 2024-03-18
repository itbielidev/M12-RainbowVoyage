import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'vue-final-modal/style.css';
import { createVfm } from 'vue-final-modal';

import App from './App.vue'
import router from './router'

const app = createApp(App)
const vfm = createVfm();

app.use(createPinia())
app.use(vfm);
app.use(router)
app.use(PrimeVue);

app.mount('#app')
