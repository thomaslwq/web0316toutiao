import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
const state = {
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || {}
}
const mutations = {
    updateUserInfo: function(state, userInfo) {
        localStorage.setItem("userInfo", JSON.stringify(userInfo))
        state.userInfo = userInfo
    }
}

export default new Vuex.Store({
    state,
    mutations
})