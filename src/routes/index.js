import {createRouter,createWebHashHistory} from 'vue-router'
import Main from '../pages/main'
const routes = [
    {
        path:'/',
        redirect:'/main'
    },
    {
        path:'/main',
        component:Main
    }
]
const router = createRouter({
    routes,
    history:createWebHashHistory()
})
export default router