
const UserRegisterIndexPage = () => import('../pages/userregisterpages/UserRegisterIndexPage.vue')

const UserRegisterRouter = {
    path: '/user', component: UserRegisterIndexPage,
    children: [

    ]
}

export default UserRegisterRouter