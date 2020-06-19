import Vue from 'vue'
import App from './App.vue'

import router from './router/router'

import axios from 'axios'
import VueAxios from 'vue-axios'

import setRem from '../public/js/setRem'

Vue.use(VueAxios ,axios);

Vue.config.productionTip = false
axios.defaults.baseURL= "http://tt.linweiqin.com/api/tt";

setRem();

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
