import {createRouter,createWebHashHistory } from 'vue-router'
import Home from "@/pages/Home.vue"
import Login from "@/pages/Login.vue"
import NotFound from "@/pages/404.vue"
import {getToken} from "@/auth/auth"
import {warning} from "@/auth/notification"
import store from '../store'
const routes = [
{
    path:"/",
    component:Login
},
{
    path:"/Home",
    component:Home
},
{ path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]
const router = createRouter({
   
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
  })


router.beforeEach(async(to,from,next) => {
    
    const token = getToken()
    if(!token && to.path != "/"){
        warning("请先登陆")
        return next({path:"/"})
    }

    if(token&&to.path == "/"){
        warning("请勿重复登录")
        return next({
            path:from.path?from.path:"Home"
        })
    }
    // ...
    // 返回 false 以取消导航
    if(token){
        await store.dispatch("getinfo")
    }
   next()
  })
  
  export default router