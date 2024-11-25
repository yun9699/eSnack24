
const ReviewIndexPage = () => import('../pages/reviewpages/ReviewIndexPage.vue');
const ReviewListPage = () => import('../pages/reviewpages/ReviewListPage.vue');
const ReviewRegisterPage = () => import('../pages/reviewpages/ReviewRegisterPage.vue');
const UserReviewListPage = () => import('../pages/reviewpages/UserReviewListPage.vue');
const ReviewDetailPage = () => import('../pages/reviewpages/ReviewDetailPage.vue');

const ReviewRouter = {
    path: '/review', component: ReviewIndexPage,
    children: [
        {
            path: ':uno/:pno', component: ReviewRegisterPage
        },
        {
            path: 'list/:pno', component: ReviewListPage,
        },
        {
            path: 'user/:uno', component: UserReviewListPage
        },
        {
            path: 'detail/:rno', component: ReviewDetailPage
        }
    ]
}

export default ReviewRouter;