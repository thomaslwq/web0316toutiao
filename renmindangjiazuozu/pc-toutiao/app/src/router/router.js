import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Index from "../components/Index"
import Login from "../components/Login"
import Register from "../components/Register"
import UserCenter from "../components/UserCenter"
import UserData from "../components/UserData.vue"
import Detail from "../components/Detail.vue"

let routes = [
    {
        path: "/",
        name: "index",
        component: Index
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/register",
        name: "register",
        component: Register
    },
    {
        path: "/userCenter",
        name: "userCenter",
        component: UserCenter
    },
    {
        path: "/userData",
        name: "userData",
        component: UserData
    },
    {
        path: "/detail/:id",
        name: "detail",
        component: Detail
    },
]

export default new VueRouter({
    routes
})