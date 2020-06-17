//引入库
import Vue from "vue"
import VueRouter from "vue-router"

//引入组件
import Index from "../components/Index"
import UserLogin from "../components/login/UserLogin.vue"
import UserRegister from "../components/login/UserRegister.vue"
import NewsDetail from "../components/news/NewsDetail.vue"
import UserCenter from "../components/user/UserCenter.vue"
import UserData from "../components/user/UserData.vue"

//使用
Vue.use(VueRouter)

//配置路由
let routes = [{
        path: "/",
        name: "index",
        component: Index
    }, {
        path: "/userLogin",
        name: "userLogin",
        component: UserLogin
    }, {
        path: "/userRegister",
        name: "userRegister",
        component: UserRegister
    }, {
        path: "/newsDetail",
        name: "newsDetail",
        component: NewsDetail
    }, {
        path: "/userCenter",
        name: "userCenter",
        component: UserCenter
    }, {
        path: "/userData",
        name: "userData",
        component: UserData
    }]
    //导出路由
export default new VueRouter({
    routes
})