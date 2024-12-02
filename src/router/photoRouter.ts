
const Photo = () => import("../pages/photopages/PhotoIndexPage.vue")

const photoRouter = {
    path: '/photo', component: Photo,
    children: []

}

export default photoRouter