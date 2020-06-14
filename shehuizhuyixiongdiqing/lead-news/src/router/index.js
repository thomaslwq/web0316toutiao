import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Login from '@/components/user/login'
import Sign from '@/components/user/sign'
import UserCenter from '@/components/user/userCenter'
import UserInfo from '@/components/user/userInfo'
import NewsDetail from '@/components/news/newsDetail'
import NewsSearch from '@/components/news/newsSearch'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign',
      name: 'Sign',
      component: Sign
    },
    {
      path: '/userCenter',
      name: 'UserCenter',
      component: UserCenter
    },
    {
      path: '/userInfo',
      name: 'UserInfo',
      component: UserInfo
    },
    {
      path: '/newsDetail',
      name: 'NewsDetail',
      component: NewsDetail
    },
    {
      path: '/newsSearch',
      name: 'NewsSearch',
      component: NewsSearch
    }
  ]
})
