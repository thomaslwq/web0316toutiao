//导入Vue Vuex
import Vue from 'vue'
import Vuex from 'vuex'
//给Vue添加回调方法Vuex
Vue.use(Vuex)

//设定一个初始值 储存获取到的接口数据
let state = JSON.parse(localStorage.getItem('state')) || {
    userInfo:{},
    isLogin:false,
    articleLists:{}
}

//所有模块组件的getter setter集合方法
const mutations = {
    //获取用户信息 并储存到本地
    userInfo:function(state,userInfo){
        localStorage.setItem('userInfo',JSON.stringify(userInfo));
        state.userInfo = userInfo;
        localStorage.setItem('state',JSON.stringify(state))
    },
    //获取到登录状态 并进行本地储存
    isLogin:function(state,isLogin){
        localStorage.setItem('isLogin',JSON.stringify(isLogin));
        state.isLogin = isLogin;
        localStorage.setItem('state',JSON.stringify(state))
    },
    //退出登录清除数据
    outLogin : (state) =>{
		localStorage.setItem('isLogin',false);
		localStorage.setItem('userInfo','');
		state.userInfo = '';
		state.isLogin = false;
		/* 更新保存全局state变量 */
		localStorage.setItem('state',JSON.stringify(state))
    },
    //发布头条留言数量储存
    updateTTCount : (state,count) => {
		let userInfo = state.userInfo;
		userInfo.tt_count = count;
		localStorage.setItem('userInfo',JSON.stringify(state.userInfo));
		state.userInfo = userInfo;
		// console.log(count);
		/* 更新保存全局state变量 */
		localStorage.setItem('state',JSON.stringify(state))
    },
    //发布文章数量储存
    updateArticleCount:(state,count) => {
        let userInfo = state.userInfo;
		userInfo.article_count = count;
        localStorage.setItem('userInfo',JSON.stringify(state.userInfo));
        state.userInfo = userInfo
        localStorage.setItem('state',JSON.stringify(state));
    },
    //文章内容储存
    updateArticleLists:(state,articleLists) => {
        localStorage.setItem('articleLists',JSON.stringify(state.articleLists))
        state.articleLists = articleLists
        localStorage.setItem('state',JSON.stringify(state))
    }
}

//导出Vuex实例共享数据
export default new Vuex.Store({
    state,
    mutations
})