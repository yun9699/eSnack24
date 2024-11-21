
const LoginIndexPage = () => import('../pages/loginpages/LoginIndexPage.vue')

const KakaoRedirectPage = () => import('../pages/loginpages/KakaoRedirectPage.vue')
const GoogleRedirectPage = () => import('../pages/loginpages/GoogleRedirectPage.vue')
const LoginMainPage = () => import('../pages/loginpages/LoginMainPage.vue')

const LoginRouter = {
    path: '/login', component: LoginIndexPage,
    children: [
        {path: '', component: LoginMainPage},
        {path: 'kakaore', component: KakaoRedirectPage},
        {path: 'googlere', component: GoogleRedirectPage},
    ]
};

export default LoginRouter