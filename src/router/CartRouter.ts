
const CartIndexPage = () => import('../pages/cartpages/CartIndexPage.vue')
const CartListPage = () => import('../pages/cartpages/CartListPage.vue')

const CartRouter = {
    path: '/cart/:uno', component: CartIndexPage,
    children: [
        {path: '', component: CartListPage},
    ]
}

export default CartRouter