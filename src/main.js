import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'primeicons/primeicons.css';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App)
app.use(router)
app.use(store)
app.use(Toast);
app.mount('#app')
