
const UserRegisterIndexPage = () => import('../pages/UserRegisterPages/UserRegisterIndexPage.vue')

const UserRegisterRouter = {
    path: '/user', component: UserRegisterIndexPage,
    children: [

    ]
}

export default UserRegisterRouter