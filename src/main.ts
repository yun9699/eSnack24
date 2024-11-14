import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import router from './router/MainRouter';
import BottomNavBar from "./layouts/BottomNavBar.vue";

createApp(App)
    .use(router)
    .component('BottomNavBar', BottomNavBar)
    .mount('#app')
