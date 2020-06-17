import Vue from 'vue'
import App from './App.vue'
import router from "./router/index"

import axios from "./common/axios"
//不能用Vue.use  因为axios是公共库而不是Vue的库，要放在原型链
Vue.prototype.$axios = axios

import { Message } from "./common/utils"
Vue.prototype.$message = Message

import store from "./vuex/store"

Vue.config.productionTip = false


new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')