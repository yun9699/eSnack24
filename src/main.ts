import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import router from './router/MainRouter';
import BottomNavBar from "./layouts/BottomNavBar.vue";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPersist);

createApp(App)
    .use(router)
    .use(pinia)
    .component('BottomNavBar', BottomNavBar)
    .mount('#app');
