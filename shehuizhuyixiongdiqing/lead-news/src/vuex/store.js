import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

let state = JSON.parse(localStorage.getItem('state')) || {
  userInfo: {},
  ifLogin: false,
  newsList: [],
  loading: false,
  newsCount: 0
};

const mutations = {
  userInfo(state, payload) {
    state.userInfo = payload;
    localStorage.setItem('state', JSON.stringify(state));
  },
  ifLogin(state, payload) {
    if (!payload) state.userInfo = '';
    state.ifLogin = payload;
    localStorage.setItem('state', JSON.stringify(state));
  },
  msgCount(state, payload) {
    state.userInfo.tt_count = payload;
    localStorage.setItem('state', JSON.stringify(state));
  },
  articleCount(state, payload) {
    state.userInfo.article_count = payload;
    localStorage.setItem('state', JSON.stringify(state));
  },
  newsList(state, {newsList, newsCount}) {
    state.newsList = newsList;
    state.newsCount = newsCount;
    localStorage.setItem('state', JSON.stringify(state));
  },
  loading(state, payload) {
    state.loading = payload;
  },
};

export default new Vuex.Store({
  state,
  mutations
})
