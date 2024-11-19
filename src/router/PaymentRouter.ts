
const PaymentIndexPage = () => import('../pages/paymentpages/PaymentIndexPage.vue')
const PaypalMainPage = () => import('../pages/paymentpages/paypalpages/PaypalMainPage.vue')

const PaymentRouter = {
    path: '/payment', component: PaymentIndexPage,
    children: [

        {path: 'paypal', component: PaypalMainPage},
    ]
}

export default PaymentRouter