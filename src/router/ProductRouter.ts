
const ProductIndexPage = () => import('../pages/productpages/ProductIndexPage.vue')

const ProductRouter = {
    path: '/product', component: ProductIndexPage,
    children: [

    ]
}

export default ProductRouter