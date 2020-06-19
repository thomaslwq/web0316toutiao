import Vue from 'vue'
import App from './App.vue'
import router from "./router/index"
import axios from "axios"

import setRem from "./utils/setRem"
setRem();

Vue.config.productionTip = false

Vue.prototype.$axios = axios

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')