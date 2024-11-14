
const UserRegisterIndexPage = () => import('../pages/UserRegisterPages/UserRegisterIndexPage.vue')
const LoginRegisterPage = () => import('../pages/UserRegisterPages/LoginRegisterPage.vue')

const UserRegisterRouter = {
    path: '/user', component: UserRegisterIndexPage,
    children: [
        {path: '', redirect: '/user/reg'},
        {path: 'reg', component: LoginRegisterPage}
    ]
}

export default UserRegisterRouter