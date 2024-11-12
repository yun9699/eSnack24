
const PaymentIndexPage = () => import('../pages/PaymentPages/PaymentIndexPage.vue')

const PaymentRouter = {
    path: '/payment', component: PaymentIndexPage,
    children: [

    ]
}

export default PaymentRouter