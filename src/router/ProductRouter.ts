import ProductListComponent from "../components/productcomponents/ProductListComponent.vue";
import ProductMainPage from "../pages/productpages/ProductMainPage.vue";
import ProductListPage from "../pages/productpages/ProductListPage.vue";

const ProductIndexPage = () => import('../pages/productpages/ProductIndexPage.vue')

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
        }

    ]
}

export default ProductRouter