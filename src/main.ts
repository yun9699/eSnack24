import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import router from './router/MainRouter';
import BottomNavBar from "./layouts/BottomNavBar.vue";
import {createPinia} from "pinia";

createApp(App)
    .use(router)
    .use(createPinia())
    .component('BottomNavBar', BottomNavBar)
    .mount('#app')
