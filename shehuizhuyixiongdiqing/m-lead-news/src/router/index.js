import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Search from '@/components/search/search'
import SearchRes from '@/components/searchRes/searchRes'
import Channel from '@/components/channel/channel'
import NewsDetail from '@/components/newsDetail/newsDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/searchRes',
      name: 'SearchRes',
      component: SearchRes
    },
    {
      path: '/channel',
      name: 'Channel',
      component: Channel
    },
    {
      path: '/newsDetail',
      name: 'NewsDetail',
      component: NewsDetail
    }
  ]
})
