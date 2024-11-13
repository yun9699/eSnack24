
const Photo = () => import("../pages/photoPages/PhotoPage.vue")

const photoRouter = {
    path: '/photo', component: Photo,
    children: []

}

export default photoRouter