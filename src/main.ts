import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import router from './router/MainRouter';
import BottomNavBar from "./components/BottomNavBar.vue";

createApp(App)
    .use(router)
    .component('BottomNavBar', BottomNavBar)
    .mount('#app')
