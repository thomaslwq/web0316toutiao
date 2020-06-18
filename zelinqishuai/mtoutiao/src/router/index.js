//引入vue
import Vue from 'vue'
//引入路由
import VueRouter from 'vue-router'
//再使用路由
Vue.use(VueRouter)
//引入路由组件
import Index from '../components/index'
import NewDetail from '../components/newDetail/NewDetail'
// import router from '../../toutiao/src/router'

//设置路由
let routes = [{
    path:'/',
    name:'index',
    component:Index
},{
    path:'/NewDetail',
    name:'NewDetail',
    component:NewDetail
}]

//导出路由  新建一个 VueRouter 实例 将routes 作为参数传进入,同时将路由导出
export default new VueRouter({routes})