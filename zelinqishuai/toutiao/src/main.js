import Vue from 'vue'
import App from './App.vue'
import axios from './common/axios'
Vue.prototype.$axios = axios;
// a.1 引入路由配置信息
import router from "./router"
import { Message } from "./common/utils"
Vue.prototype.$Message = Message;
Vue.config.productionTip = false

import Vuex from 'vuex'
import store from './vuex/store'

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
