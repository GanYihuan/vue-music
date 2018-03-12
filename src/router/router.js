import Vue from 'vue'
import Router from 'vue-router'

import Recommend from '../components/recommend/recommend.vue'
import Singer from '../components/singer/singer.vue'
import Rank from '../components/rank/rank.vue'
import Search from '../components/search/search.vue'
import SingerDetail from '../components/singer-detail/singer-detail.vue'

Vue.use(Router)

// const Recommend = (resolve) => {
//   import('../components/recommend/recommend').then((module) => {
//     resolve(module)
//   })
// }
//
// const Singer = (resolve) => {
//   import('../components/singer/singer').then((module) => {
//     resolve(module)
//   })
// }
//
// const Rank = (resolve) => {
//   import('../components/rank/rank').then((module) => {
//     resolve(module)
//   })
// }
//
// const Search = (resolve) => {
//   import('../components/search/search').then((module) => {
//     resolve(module)
//   })
// }
//
// const SingerDetail = (resolve) => {
//   import('../components/singer-detail/singer-detail').then((module) => {
//     resolve(module)
//   })
// }
//
// const Disc = (resolve) => {
//   import('../components/disc/disc').then((module) => {
//     resolve(module)
//   })
// }
//
// const TopList = (resolve) => {
//   import('../components/top-list/top-list').then((module) => {
//     resolve(module)
//   })
// }
//
// const UserCenter = (resolve) => {
//   import('../components/user-center/user-center').then((module) => {
//     resolve(module)
//   })
// }

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend',
      name: '主页'
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/singer',
      component: Singer
      ,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/search',
      component: Search
    }
    // ,
    // {
    //   path: '/singerDetail/:id',
    //   component: SingerDetail
    // }
  ]
})
