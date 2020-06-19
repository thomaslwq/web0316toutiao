import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import axios from './common/axios'
import { Message } from './common/utils'
Vue.prototype.$axios = axios;
Vue.prototype.$Message = Message
// import Vuex from 'vuex'
import store from './vuex/store'
Vue.config.productionTip = false
import {reSizeRem} from './common/setRem'
reSizeRem()
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
