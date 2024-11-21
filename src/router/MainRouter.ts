import {createRouter, createWebHistory} from "vue-router";

import LoginRouter from "./LoginRouter.ts";
import CSRouter from "./CSRouter.ts";
import PaymentRouter from "./PaymentRouter.ts";
import ProductRouter from "./ProductRouter.ts";
import ReviewRouter from "./ReviewRouter.ts";
import UserRegisterRouter from "./UserRegisterRouter.ts";
import UserRouter from "./UserRouter.ts";
import photoRouter from "./photoRouter.ts";
import cartRouter from "./CartRouter.ts";

const routes = [
    CSRouter,
    LoginRouter,
    PaymentRouter,
    ProductRouter,
    ReviewRouter,
    UserRegisterRouter,
    UserRouter,
    photoRouter,
    cartRouter

]


const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router;