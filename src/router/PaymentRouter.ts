
const PaymentIndexPage = () => import('../pages/paymentpages/PaymentIndexPage.vue')

const PaymentRouter = {
    path: '/payment', component: PaymentIndexPage,
    children: [

    ]
}

export default PaymentRouter