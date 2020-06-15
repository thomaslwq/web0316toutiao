// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import axios from 'axios'
import VueAxios from 'vue-axios'

import Vuex from 'vuex'
import store from './vuex/store'

import 'lib-flexible/flexible.js'

Vue.use(ElementUI);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

axios.defaults.baseURL = 'http://tt.linweiqin.com/api/tt';
axios.interceptors.request.use(function (config) {
  if (config.url === "/getArticles") {
    store.commit('loading', true);
  }
  return config
})
axios.interceptors.response.use(function (response) {
  if (response.data.articles) {
    store.commit('loading', false);
  }
  return response
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})