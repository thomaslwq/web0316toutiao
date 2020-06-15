import Vue from 'vue'
import App from './App.vue'
//b.1 引入 自定义的请求库 axios
import axios from "./common/axios"
// c.1 引入 自定义的消息控件
import { Message } from "./common/utils"
//b.2 挂载到Vue 的原型上
Vue.prototype.$axios = axios;
// c.2 挂载到Vue 的原型上
Vue.prototype.$message = Message;
// a.1 引入路由配置信息
import router from "./router"
//d.1  引入vuex store
import store from "./vuex/store"
Vue.config.productionTip = false

new Vue({
  　// a.2 配置路由信息
  router,
  // d.2 
  store,
  render: h => h(App),
}).$mount('#app')
