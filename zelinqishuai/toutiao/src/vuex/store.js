import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let state = JSON.parse(localStorage.getItem('state'))

console.log('初始值'+state);

const mutations = {
    userInfo:function(state,userInfo){
        localStorage.setItem('userInfo',JSON.stringify(userInfo));
        state.userInfo = userInfo;
        localStorage.setItem('state',JSON.stringify(state))
    },
    isLogin:function(state,isLogin){
        localStorage.setItem('userInfo',JSON.stringify(isLogin));
        state.userInfo = isLogin;
        localStorage.setItem('state',JSON.stringify(state))
    }
}

export default new Vuex.Store({
    state,
    mutations
})