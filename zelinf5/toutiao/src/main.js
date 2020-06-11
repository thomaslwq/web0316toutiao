// 1. 引入Vue
import Vue from 'vue'
import App from './App.vue'
// 2. 引入路由组件
import VueRouter from "vue-router"
// 2.2使用vuerouter
Vue.use(VueRouter)
    // a.1 引入路由配置信息
import router from "./router/index"
Vue.config.productionTip = false

new Vue({
    // a.2 配置路由信息
    router,
    render: h => h(App),
}).$mount('#app')