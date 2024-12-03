
const RequestIndex = () => import('../pages/communitypages/allergy/RequestAllergyIndexPage.vue')
const RequestList = () => import('../pages/communitypages/allergy/RequestAllergyListPage.vue')
const RequestDetail = () => import('../pages/communitypages/allergy/RequestAllergyDetailPage.vue')
const RequestEdit = () => import('../pages/communitypages/allergy/RequestAllergyEditPage.vue')
const RequestRegister = () => import('../pages/communitypages/allergy/RequestAllergyRegisterPage.vue')

const RequestAllergyRouter = {

    path: '/request/allergy',
    component: RequestIndex,
    children: [
        {
            path: 'list',
            component: RequestList
        },
        {
            path: 'detail/:cano',
            component: RequestDetail
        },
        {
            path: 'add',
            component: RequestRegister
        },
        {
            path: 'edit/:cano',
            component: RequestEdit
        }
    ]

}
export default RequestAllergyRouter