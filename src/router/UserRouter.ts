
const UserIndexPage = () => import('../pages/userpages/UserIndexPage.vue')
const UserMainPage = () =>  import('../pages/userpages/UserMainPage.vue')

const UserRouter = {
    path: `/my/:uno`, component: UserIndexPage,
    children: [
        {path: '', component: UserMainPage},
    ]
}

export default UserRouter