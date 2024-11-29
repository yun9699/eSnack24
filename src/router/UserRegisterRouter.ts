
const UserRegisterIndexPage = () => import('../pages/userregisterpages/UserRegisterIndexPage.vue')
const LoginRegisterPage = () => import('../pages/userregisterpages/LoginRegisterPage.vue')

const UserRegisterRouter = {
    path: '/user', component: UserRegisterIndexPage,
    children: [
        {path: '', redirect: '/user/reg'},
        {path: 'reg', component: LoginRegisterPage}
    ]
}

export default UserRegisterRouter