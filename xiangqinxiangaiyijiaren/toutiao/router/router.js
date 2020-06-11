import Vue from 'vue'
import Router from 'vue-router'
import index from '../src/components/index';
import login from '../src/components/User/UserLogin'
import newsDetail from '../src/components/News/NewsListDetail'
import userCenter from '../src/components/User/UserCenter'
import userData from '../src/components/User/UserData'

Vue.use(Router)
let routes = [
    {
        path:'/index',
        component:index,
        props:true,
        name:'index'
    },
    {
        path:'/login',
        component:login,
        name:'login'
    },
    {
        path:'/newsDetail',
        component:newsDetail,
        props:true,
        name:'newsdetail'
    },
    {
        path:'/userCenter',
        component:userCenter,
    },
    {
        path:'/userData',
        component:userData,
    },
    {
        path:'/',
        redirect:'/index'
    },
]
export default new Router({
    routes
})