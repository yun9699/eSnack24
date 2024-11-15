const FAQIndexPage = () => import('../pages/cspages/FAQIndexPage.vue')
const QNAIndexPage = () => import('../pages/cspages/QNAIndexPage.vue')
const QNARegisterPage = () => import('../pages/cspages/QNARegisterPage.vue')

const CSRouter = {
    path: '/cs',
    children: [
        {
            path: 'faq',
            component: FAQIndexPage,
        },
        {
            path: 'qna',
            component: QNAIndexPage,
        },
        {
            path: 'qna/register',
            component: QNARegisterPage,
        }
    ]
}

export default CSRouter