import Vue from 'vue'
import App from './App.vue'

import router from "./router/router"

import axios from 'axios'
import VueAxios from 'vue-axios'

import Vuex from 'vuex'
import store from './vuex/store'

Vue.use(VueAxios ,axios);

Vue.config.productionTip = false;
axios.defaults.baseURL= "http://tt.linweiqin.com/api/tt";

new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App),
})
