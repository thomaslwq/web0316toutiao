import Vue from "vue"
import VueRouter from "vue-router"
import Index from "../components/index/Index.vue"
import Article from "../components/article/Article.vue"
Vue.use(VueRouter);
// 配置路由
export default new VueRouter({
    routes:[
        {
            path:"/",
            name:"index",
            component:Index
        },
        {
            path:"/article",
            name:"article",
            component:Article
        }
    ]
})