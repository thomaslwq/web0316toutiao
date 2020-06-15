// 1. 引入  Vue
import Vue from "vue"
// 2. 引入 vuex
import Vuex from "vuex"
import {UPDATE_USER_INFO } from "./mutationsType"
//3. 在Vue 中 使用 Vuex
Vue.use(Vuex);
let storageKey = "userInfo";
//4. 开始配置 state 
const state = {
    userInfo:JSON.parse(localStorage.getItem(storageKey))||{} //用户信息
}
const mutations = {
    // 更新用户信息
    [UPDATE_USER_INFO]:function(state,userInfo){
        localStorage.setItem(storageKey,JSON.stringify(userInfo));
        state.userInfo = userInfo;
    }
}
//5. 配置state mutations 到store中
export default new Vuex.Store({
    state,mutations
})