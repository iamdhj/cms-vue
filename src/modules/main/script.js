import Vue from 'vue'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import {Init, Mix} from '*utils'
import {router, links, paths} from './pages/router'
import {store} from './store/store'

import {Links} from '*urls'

import './style.scss'
import view from './view.vue'

Vue.use(iview)

// 全局路由事件
router.beforeEach((to, from, next) => {
  // 默认跳转到‘default'的页面
  if (to.path === '/') {
    next({name: 'default', replace: true})
  } else {
    next()
  }
})

let page = Mix({
  data: () => ({
    links: links.filter(({props}) => props),
    paths,
    viewIndex: '',
    viewTitle: ''
  }),
  computed: {
    activeMenu() {
      return String(this.viewIndex)
    }
  },
  methods: {
    // 更新 router-view 信息
    upViewInfo() {
      let vIndex, vTitle
      let path = this.$router.currentRoute.path
      links.forEach((item, index) => {
        if (item.path === path) {
          vIndex = index
          vTitle = item.title
          return true
        }
      })
      this.viewIndex = vIndex
      this.viewTitle = vTitle
    },
    logout() {
      location.href = Links.LOGIN
    }
  },
  watch: {
    '$route': 'upViewInfo'
  },
  created() {
    this.upViewInfo()
  }
}, view)

Init({
  store,
  router
}, page)
