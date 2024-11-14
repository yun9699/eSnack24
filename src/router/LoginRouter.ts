
const LoginIndexPage = () => import('../pages/LoginPages/LoginIndexPage.vue')

const KakaoRedirectPage = () => import('../pages/LoginPages/KakaoRedirectPage.vue')
const GoogleRedirectPage = () => import('../pages/LoginPages/GoogleRedirectPage.vue')
const LoginMainPage = () => import('../pages/LoginPages/LoginMainPage.vue')

const LoginRouter = {
    path: '/login', component: LoginIndexPage,
    children: [
        {path: '', component: LoginMainPage},
        {path: 'kakaore', component: KakaoRedirectPage},
        {path: 'googlere', component: GoogleRedirectPage},
    ]
};

export default LoginRouter