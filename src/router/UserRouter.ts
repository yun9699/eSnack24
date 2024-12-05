

const UserIndexPage = () => import('../pages/userpages/UserIndexPage.vue')
const UserMainPage = () =>  import('../pages/userpages/UserMainPage.vue')
const UserEditPage = () =>  import('../pages/userpages/UserEditPage.vue')
const UserOrderListPage = () =>  import("../pages/userpages/UserOrderListPage.vue")
const UserEditPage = () =>  import('../pages/userpages/UserEditPage.vue')



const UserRouter = {
    path: `/my`, component: UserIndexPage,
    children: [
        {path: ':uno', component: UserMainPage},
        {path: 'edit/:uno', component: UserEditPage},
        { path: ':uno', component: UserMainPage },
        { path: ':uno/order/list', component: UserOrderListPage }
    ]
}

export default UserRouter