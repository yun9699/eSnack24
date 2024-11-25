
const Search = () => import("../pages/searchpages/SearchIndexPage.vue")
const ProductSearch = () => import("../pages/searchpages/ProductSearchPage.vue")

const SearchRouter = {
    path: '/search', component: Search,
    children: [
        {
            path: '', component: ProductSearch,
        }

    ]
}

export default SearchRouter