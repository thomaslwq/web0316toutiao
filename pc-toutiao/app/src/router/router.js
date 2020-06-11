import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Index from "../components/Index"
import HelloWorld from "../components/HelloWorld"

let routes = [
    {
        path: "/",
        name: "index",
        component: Index
    },
    {
        path: "/hello",
        name: "hello",
        component: HelloWorld
    },
]

export default new VueRouter({
    routes
})