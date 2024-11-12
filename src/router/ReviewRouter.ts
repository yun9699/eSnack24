
const ReviewIndexPage = () => import('../pages/ReviewPages/ReviewIndexPage.vue');

const ReviewRouter = {
    path: '/review', component: ReviewIndexPage,
    children: [

    ]
}

export default ReviewRouter;