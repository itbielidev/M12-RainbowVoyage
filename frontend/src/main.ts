import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'vue-final-modal/style.css';
import { createVfm } from 'vue-final-modal';
import { createHead } from '@unhead/vue';
import ToastService from 'primevue/toastservice';


import App from './App.vue'
import router from './router'

// FONTAWESOME
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
const app = createApp(App)
const head = createHead();
const vfm = createVfm();

library.add(fas, far, fab)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(head);
app.use(vfm);
app.use(router)
app.use(PrimeVue);
app.use(ToastService);

app.mount('#app')

