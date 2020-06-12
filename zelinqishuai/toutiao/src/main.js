import Vue from 'vue'
import App from './App.vue'
import axios from './common/axios'
Vue.prototype.$axios = axios;
// a.1 引入路由配置信息
import router from "./router"
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
