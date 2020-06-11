import Vue from 'vue'
import App from './App.vue'
import router from '../router/router'
import store from '../vuex/store'
import './plugins/element'
import axios from 'axios'
Vue.config.productionTip = false
let loading
axios.defaults.baseURL='//tt.linweiqin.com/api/tt/'
axios.interceptors.request.use(config =>{
  loading = Vue.prototype.$loading({
    text: '加载数据中……',
    background: 'rgba(0, 0, 0, 0.8)',
    spinner:"el-icon-loading",
  })
  return config
})
Vue.prototype.$axios=axios
axios.interceptors.response.use(req=>{
  loading.close()
  return req.data
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')