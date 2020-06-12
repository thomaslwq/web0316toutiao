import Vue from 'vue'
import App from './App.vue'
//b.1 引入 自定义的请求库 axios
import axios from "./common/axios"
//b.2 挂载到Vue 的原型上
Vue.prototype.$axios = axios;
// a.1 引入路由配置信息
import router from "./router"
Vue.config.productionTip = false

new Vue({
  　// a.2 配置路由信息
  router,
  render: h => h(App),
}).$mount('#app')
