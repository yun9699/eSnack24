
const OrderIndexPage = () => import('../pages/orderpages/OrderIndexPage.vue');

const CreateOrderPage = () => import('../pages/orderpages/CreateOrderPage.vue')
const OrderCompletePage = () => import('../pages/orderpages/OrderCompletePage.vue')
const OrderDetailtePage = () => import('../pages/orderpages/OrderDetailPage.vue')

const OrderRouter = {

    path: '/order', component: OrderIndexPage,
    children: [
        {path: 'create/:ono', component: CreateOrderPage},
        {path: 'complete/:ono', component: OrderCompletePage},
        {path: 'detail/:ono', component: OrderDetailtePage},
    ]
}

export default OrderRouter