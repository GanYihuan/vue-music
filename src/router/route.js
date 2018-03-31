import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 路由懒加载替代常规方式
// import Recommend from 'components/recommend/recommend'
const Recommend = resolve => {
  import('components/recommend/recommend').then(module => {
    resolve(module)
  })
}

const Singer = resolve => {
  import('components/singer/singer').then(module => {
    resolve(module)
  })
}

const Rank = resolve => {
  import('components/rank/rank').then(module => {
    resolve(module)
  })
}

const Search = resolve => {
  import('components/search/search').then(module => {
    resolve(module)
  })
}

const SingerDetail = resolve => {
  import('components/singer-detail/singer-detail').then(module => {
    resolve(module)
  })
}

const Disc = resolve => {
  import('components/disc/disc').then(module => {
    resolve(module)
  })
}

const TopList = resolve => {
  import('components/top-list/top-list').then(module => {
    resolve(module)
  })
}

const UserCenter = resolve => {
  import('components/user-center/user-center').then(module => {
    resolve(module)
  })
}

// 路由嵌套, 父子路由关系
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: TopList
        }
      ]
    },
    {
      path: '/search',
      component: Search,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/user',
      component: UserCenter
    }
  ]
})
