// 1. 引入 Vue
import Vue from "vue"
// 2.1. 引入路由组件
import VueRouter from "vue-router"
// 2.2 使用 VueRouter
Vue.use(VueRouter)
//4. 引入组件
import Index from "../components/Index"
import UserLogin from "../components/login/UserLogin.vue"
import UserRegister from "../components/login/UserRegister.vue"
import NewsDetail from "../components/news/NewsDetail"
import UserCenter from "../components/user/UserCenter"
import UserData from "../components/user/UserData"
// 3. 路由配置文件
let routes = [{
    path:"/",
    name:"index",
    component:Index
},{
    path:"/userLogin",
    name:"userLogin",
    component:UserLogin
},{
    path:"/userRegister",
    name:"userRegister",
    component:UserRegister
},{
    path:"/newsDetail",
    name:"newsDetail",
    component:NewsDetail
},{
    path:"/userCenter",
    name:"userCenter",
    component:UserCenter
},{
    path:"/userData",
    name:"userData",
    component:UserData
}]
// 5. 新建一个 VueRouter 实例 将routes 作为参数传进入,同时将路由导出
export default new VueRouter({
    routes
})