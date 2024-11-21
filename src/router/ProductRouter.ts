
const ProductIndexPage = () => import('../pages/productpages/ProductIndexPage.vue')
const ProductMainPage = () => import('../pages/productpages/ProductMainPage.vue')
const ProductListPage = () => import('../pages/productpages/ProductListPage.vue')
const ProductDetailPage = () => import('../pages/productpages/ProductDetailPage.vue')

const ProductRouter = {
    path: '/product', component: ProductIndexPage,
    children: [
        {
            path: "main",  component: ProductMainPage
        },
        {
            path: "/", redirect: "/product/main"
        },
        {
            path: "list", component: ProductListPage
        },
        {
            path: "list/:pno", component: ProductDetailPage
        }
    ]
}

export default ProductRouter