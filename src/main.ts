import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import router from './router/MainRouter';
import BottomNavBar from "./layouts/BottomNavBar.vue";
import {createPinia} from "pinia";
import piniaPersistedState from 'pinia-plugin-persistedstate';

createApp(App)
    .use(router)
    .use(createPinia().use(piniaPersistedState))
    .component('BottomNavBar', BottomNavBar)
    .mount('#app')
