import Vue from 'vue'
import VueRouter from 'vue-router'

import Build from './build.vue'
import List from './list.vue'

Vue.use(VueRouter)

// 路由配置
const config = [
  { title: '添加', path: '/build', component: Build },
  { title: '列表', path: '/list', component: List }
]

const routes = config.map(({path, component}) => ({path, component}))
const links = config.map(({title, path}) => ({title, path}))

const router = new VueRouter({ routes })

export {
  links,
  router,
  router as default
}
