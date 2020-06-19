import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)
import Index from "../components/index/Index.vue"
import Article from "../components/article/Article.vue"

export default new VueRouter({
    routes: [{
        path: "/",
        name: "index",
        component: Index
    }, {
        path: "/article",
        name: "article",
        component: Article
    }]
})