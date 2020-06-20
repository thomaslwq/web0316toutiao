import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 这里定义初始值
let state = {
    loginStatus: false,
    userInfo: {},
    articleData: [],
};

/* 变动 */
const mutations = {
    refreshArticle: function(state ,{arr}) {  
        this.state.articleData = arr;
    },
    appendArticle: function(state ,{arr}) {
        this.state.articleData.push(...arr);
    },
    modifyLoginInfo: function(state ,{params}) {
        localStorage["userInfo"] = JSON.stringify(params);
        this.state.userInfo = params;
        this.state.loginStatus = true;
    },
    exitLogin: function(state) {
        localStorage["userInfo"] = "";
        this.state.userInfo = "";
        this.state.loginStatus = false;
    },
    modifyToutiaoCount: function(state ,{kind}) {
        if(kind == "add"){
            this.state.userInfo.tt_count += 1;
        }
        else {
            this.state.userInfo.tt_count -= 1;
        }
        this.commit("updateLocalStorage")
    },
    modifyArticleCount: function(state ,{kind}) {
        if(kind == "add"){
            this.state.userInfo.article_count += 1;
        }
        else {
            this.state.userInfo.article_count -= 1;
        }
        this.commit("updateLocalStorage")
    },
    updateUserInfo: function(state ,{params}) {
        this.state.userInfo.nickname = params.nickname;
        this.state.userInfo.avator = params.url;
        this.commit("updateLocalStorage")
    },
    updateLocalStorage: function(state) {
        localStorage["userInfo"] = JSON.stringify(this.state.userInfo);
    }
};

// 事件触发后的逻辑操作
// 参数为事件函数
const actions = {

};

// 返回改变后的数值
const getters = {

};

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})