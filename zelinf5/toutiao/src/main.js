// 1. 引入Vue
import Vue from 'vue'
import App from './App.vue'
// b.1 引入axios 请求库
import axios from "./common/axios"
// b。2挂载到 Vue的原型上
Vue.prototype.$axios = axios;
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