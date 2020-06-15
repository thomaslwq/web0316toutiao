// 1. 引入Vue
import Vue from 'vue'
import App from './App.vue'

// c.1 引入自己定义的消息控件
import { Message } from "./common/utils"
// b.1 引入axios 请求库
import axios from "./common/axios"
// b。2挂载到 Vue的原型上
Vue.prototype.$axios = axios;
// c。2 挂载到 Vue原型上
Vue.prototype.$message = Message;

// 2. 引入路由组件
import VueRouter from "vue-router"
// 2.2使用vuerouter
Vue.use(VueRouter)
    // a.1 引入路由配置信息
import router from "./router/index"
// 引入Vuex 
import store from "./vuex/store"
Vue.config.productionTip = false

new Vue({
    // a.2 配置路由信息
    router,
    store,
    render: h => h(App),
}).$mount('#app')