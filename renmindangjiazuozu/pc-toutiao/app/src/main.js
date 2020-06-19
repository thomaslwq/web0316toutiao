import Vue from 'vue'
import App from './App.vue'

import router from "./router/router"

import axios from 'axios'
import VueAxios from 'vue-axios'

import Vuex from 'vuex'
import store from './vuex/store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(VueAxios ,axios);
Vue.use(ElementUI);

Vue.config.productionTip = false;
axios.defaults.baseURL= "http://tt.linweiqin.com/api/tt";

new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App),
})

// router.beforeEach((to, from, next) => {
//   console.log(to)
//   next();
// })