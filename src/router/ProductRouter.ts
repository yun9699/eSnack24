
const ProductIndexPage = () => import('../pages/ProductPages/ProductIndexPage.vue')

const ProductRouter = {
    path: '/product', component: ProductIndexPage,
    children: [

    ]
}

export default ProductRouter