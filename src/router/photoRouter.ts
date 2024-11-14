
const Photo = () => import("../pages/photopages/PhotoPage.vue")

const photoRouter = {
    path: '/photo', component: Photo,
    children: []

}

export default photoRouter