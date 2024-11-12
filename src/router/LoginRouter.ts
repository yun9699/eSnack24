
const LoginIndexPage = () => import('../pages/LoginPages/LoginIndexPage.vue')

const LoginRouter = {
    path: '/login', component: LoginIndexPage,
    children: [

    ]

};

export default LoginRouter