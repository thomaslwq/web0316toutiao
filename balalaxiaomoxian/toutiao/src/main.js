import Vue from 'vue'
import App from './App.vue'
import router from "./router/index"

import axios from "./common/axios"
//不能用Vue.use  因为axios是公共库而不是Vue的库，要放在原型链
Vue.prototype.$axios = axios

Vue.config.productionTip = false


new Vue({
    router,
    render: h => h(App),
}).$mount('#app')