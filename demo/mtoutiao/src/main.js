import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import axios from "axios"
import setRem from "./utils/setRem"
// 执行函数
setRem();
Vue.config.productionTip = false
Vue.prototype.$axios = axios
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
