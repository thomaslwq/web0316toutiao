import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

let state = {
  newsList: JSON.parse(localStorage.getItem('news-list')) || [],
  newsCount: +localStorage.getItem('news-count') || 0,
  lazyPages: 0,
  loading: false,
  channelList: JSON.parse(localStorage.getItem('channel-list')) || {
    added: ["推荐", "热点", "社会", "娱乐", "科技", "汽车", "体育", "财经", "军事", "国际", "时尚", "游戏"],
    rest: ["旅游", "历史", "探索", "美食", "育儿", "养生", "故事", "美文"]
  }
};

const mutations = {
  newsList(state, {newsList, newsCount}) {
    state.newsList = newsList;
    state.newsCount = newsCount;
    localStorage.setItem('news-list', JSON.stringify(newsList));
    localStorage.setItem('news-count', newsCount);
  },
  lazyPages(state, payload) {
    state.lazyPages = payload;
  },
  loading(state, payload) {
    state.loading = payload;
  },
  channelList(state, payload) {
    state.channelList = payload;
    localStorage.setItem('channel-list', JSON.stringify(payload));
  }
};

export default new Vuex.Store({
  state,
  mutations
})