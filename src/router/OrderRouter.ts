
const OrderIndexPage = () => import('../pages/orderpages/OrderIndexPage.vue');

const CreateOrderPage = () => import('../pages/orderpages/CreateOrderPage.vue')
const OrderCompletePage = () => import('../pages/orderpages/OrderCompletePage.vue')
const OrderDetailtePage = () => import('../pages/orderpages/OrderDetailPage.vue')
const TossCompleteComponent = () => import('../components/tosscomponents/TossSuccessComponent.vue')
const TossFailComponent = () => import('../components/tosscomponents/TossFailComponent.vue')

const OrderRouter = {

    path: '/order', component: OrderIndexPage,
    children: [
        {path: 'create/:ono', component: CreateOrderPage},
        {path: 'complete/:ono', component: OrderCompletePage},
        {path: 'detail/:ono', component: OrderDetailtePage},
        {path: 'tosscomplete/:ono', component: TossCompleteComponent},
        {path: 'tossfail/:ono', component: TossFailComponent}
    ]
}

export default OrderRouter