import Vue from 'vue'
import App from './App.vue'

// a.1 引入路由配置信息
import router from "./router"
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
