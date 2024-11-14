
const ProductIndexPage = () => import('../pages/productpages/ProductIndexPage.vue')

const ProductRouter = {
    path: '/product', component: ProductIndexPage,
    children: [
        {
            path: "/",  redirect: '/product'
        }

    ]
}

export default ProductRouter