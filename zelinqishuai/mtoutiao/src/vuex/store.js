//导入 vue vuex
import Vue from 'vue'
import Vuex from 'vuex'

//使用vuex
Vue.use(Vuex)

//设定一个初始值
let state = {
    currentId:'tuijian',
    news:[]
}

//所有模块 gettr settr 方法集合
const mutations = {

}

//导出vuex实例

export default new Vuex.Store({
    state,
    mutations
})