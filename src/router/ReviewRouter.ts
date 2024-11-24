
const ReviewIndexPage = () => import('../pages/reviewpages/ReviewIndexPage.vue');
const ReviewListPage = () => import('../pages/reviewpages/ReviewListPage.vue');
const ReviewRegisterPage = () => import('../pages/reviewpages/ReviewRegisterPage.vue');

const ReviewRouter = {
    path: '/review', component: ReviewIndexPage,
    children: [
        {
            path: '', component: ReviewRegisterPage
        },
        {
            path: 'list/:pno', component: ReviewListPage,
        },
    ]
}

export default ReviewRouter;