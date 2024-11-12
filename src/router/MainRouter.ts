import {createRouter, createWebHistory} from "vue-router";

import LoginRouter from "./LoginRouter.ts";
import CSRouter from "./CSRouter.ts";
import PaymentRouter from "./PaymentRouter.ts";
import ProductRouter from "./ProductRouter.ts";
import ReviewRouter from "./ReviewRouter.ts";
import UserRegisterRouter from "./UserRegisterRouter.ts";
import UserRouter from "./UserRouter.ts";


const MainPage = () => import('../pages/MainPage.vue')

const routes = [
    {path: '/', component: MainPage},
    {
        path: '/search',
        name: 'Search',
        component: () => import('../views/SearchView.vue')
    },
    {
        path: '/cart',
        name: 'Cart',
        component: () => import('../views/CartView.vue')
    },
    {
        path: '/camera',
        name: 'Camera',
        component: () => import('../views/CameraView.vue')
    },
    {
        path: '/contact',
        name: 'Contact',
        component: () => import('../views/ContactView.vue')
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('../views/ProfileView.vue')
    },
    CSRouter,
    LoginRouter,
    PaymentRouter,
    ProductRouter,
    ReviewRouter,
    UserRegisterRouter,
    UserRouter

]


const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router;