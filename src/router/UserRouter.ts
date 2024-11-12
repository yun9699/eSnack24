
const UserIndexPage = () => import('../pages/UserPages/UserIndexPage.vue')

const UserRouter = {
    path: '/my', component: UserIndexPage,
    children: [

    ]
}

export default UserRouter