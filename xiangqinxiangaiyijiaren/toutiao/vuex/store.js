
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
let state = JSON.parse(localStorage.getItem('state')) || {};
state.searchData = []
state.handleScroll = ''
/* 变动 */
const mutations = {
    setSearchData(state,data){
        state.searchData = data
    },
    setScrollHandle(state,cb){
        state.handleScroll = cb
    },
    userinfo : (state,userinfo) => {
        localStorage.setItem('userinfo',JSON.stringify(userinfo));
        state.userinfo = userinfo;
        /* 更新保存全局state变量 */
        localStorage.setItem('state',JSON.stringify(state))
    },
   
        updateTTCount : (state,count) => {
        let userinfo = state.userinfo;
        userinfo.tt_count = count;
        localStorage.setItem('userinfo',JSON.stringify(state.userinfo));
        state.userinfo = userinfo;
        console.log(count);
        /* 更新保存全局state变量 */
        localStorage.setItem('state',JSON.stringify(state))
    },
    updateArticleCount : (state,count) => {
        state.userinfo.article_count = count;
        localStorage.setItem('userinfo',JSON.stringify(state.userinfo));
        /* 更新保存全局state变量 */
        localStorage.setItem('state',JSON.stringify(state))
    },
    logout : (state) =>{
        state.userinfo = '';
        localStorage.setItem('userinfo','');
        localStorage.setItem('state',JSON.stringify(state))
    }
};



export default new Vuex.Store({
  state,
  mutations,
})