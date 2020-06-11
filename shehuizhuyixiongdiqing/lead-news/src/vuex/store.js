import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

let state = JSON.parse(localStorage.getItem('state'));

const mutations = {
  userInfo(state, payload) {
    state.userInfo = payload;
    localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
    localStorage.setItem('state', JSON.stringify(state));
  },
  ifLogin(state, payload) {
    localStorage.setItem('ifLogin', payload);
    localStorage.setItem('userInfo', payload ? state.userInfo : '');
    if (!payload) state.userInfo = '';
    state.ifLogin = payload;
    localStorage.setItem('state', JSON.stringify(state));
  },
  msgCount(state, payload) {
    state.userInfo.msgCount = payload;
    localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
    localStorage.setItem('state', JSON.stringify(state));
  },
  articleCount(state, payload) {
    state.userInfo.atcCount = payload;
    localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
    localStorage.setItem('state', JSON.stringify(state));
  }
};

const actions = {};

const getters = {};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
