
const RequestProductIndex = () => import('../pages/communitypages/product/RequestProductIndexPage.vue')
const RequestProductList = () => import('../pages/communitypages/product/RequestProductListPage.vue')
const RequestProductDetail = () => import('../pages/communitypages/product/RequestProductDetailPage.vue')
const RequestProductEdit = () => import('../pages/communitypages/product/RequestProductEditPage.vue')
const RequestProductRegister = () => import('../pages/communitypages/product/RequestProductRegisterPage.vue')


const RequestProductRouter = {

    path: '/request/product',
    component: RequestProductIndex,
    children: [
        {
            path: 'list',
            component: RequestProductList,
        },
        {
            path: 'detail/:cpno',
            component: RequestProductDetail,
        },
        {
            path: 'add',
            component: RequestProductRegister
        },
        {
            path: 'edit/:cpno',
            component: RequestProductEdit
        }
        ]

}
export default RequestProductRouter