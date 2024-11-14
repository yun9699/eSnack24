
const UserIndexPage = () => import('../pages/userpages/UserIndexPage.vue')

const UserRouter = {
    path: '/my', component: UserIndexPage,
    children: [

    ]
}

export default UserRouter